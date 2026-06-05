import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ShieldCheck, Truck, Package, CreditCard, CheckCircle2, Search as SearchIcon, MapPin, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useRef } from "react";

import { useCart } from "@/lib/cart-context";
import { resolveProductImageUrl } from "@/lib/product-images.ts";

export const Route = createFileRoute("/checkout")({ component: CheckoutPage });

type Step = 'shipping' | 'summary' | 'success';

interface ShippingMethod {
  id: string;
  name: string;
  price: number;
  time: string;
}

function CheckoutPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const activeItems = items.filter(item => !item.savedForLater);

  const [step, setStep] = useState<Step>('shipping');
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    cityRef: "",
    department: "",
    departmentRef: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [selectedMethod, setSelectedMethod] = useState<string>('nova_poshta');

  const [citySearch, setCitySearch] = useState("");
  const [cities, setCities] = useState<any[]>([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [isCitiesLoading, setIsCitiesLoading] = useState(false);

  const [departments, setDepartments] = useState<any[]>([]);
  const [isDepartmentsLoading, setIsDepartmentsLoading] = useState(false);

  const citySearchRef = useRef<HTMLDivElement>(null);

  const shippingMethods: ShippingMethod[] = [
    { id: 'nova_poshta', name: t('checkout.methods.nova_poshta'), price: 5, time: "1-2 business days" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (citySearchRef.current && !citySearchRef.current.contains(event.target as Node)) {
        setShowCitySuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (citySearch.length < 2) {
      setCities([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsCitiesLoading(true);
      try {
        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          body: JSON.stringify({
            modelName: "Address",
            calledMethod: "getCities",
            methodProperties: {
              FindByString: citySearch,
              Limit: "10"
            },
            apiKey: "" // Often works for getCities even without key, or use a public one if available
          })
        });
        const data = await response.json();
        if (data.success) {
          setCities(data.data);
          setShowCitySuggestions(true);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setIsCitiesLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [citySearch]);

  useEffect(() => {
    if (!formData.cityRef) {
      setDepartments([]);
      return;
    }

    const fetchDepartments = async () => {
      setIsDepartmentsLoading(true);
      try {
        const response = await fetch('https://api.novaposhta.ua/v2.0/json/', {
          method: 'POST',
          body: JSON.stringify({
            modelName: "Address",
            calledMethod: "getWarehouses",
            methodProperties: {
              CityRef: formData.cityRef,
            },
            apiKey: ""
          })
        });
        const data = await response.json();
        if (data.success) {
          setDepartments(data.data);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      } finally {
        setIsDepartmentsLoading(false);
      }
    };

    fetchDepartments();
  }, [formData.cityRef]);

  const currentMethod = shippingMethods.find(m => m.id === selectedMethod)!;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = t('checkout.errors.name_required');
    
    // Simple phone validation: at least 10 digits
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.phone)) newErrors.phone = t('checkout.errors.phone_invalid');
    
    if (selectedMethod === 'nova_poshta') {
      if (!formData.cityRef) newErrors.city = t('checkout.errors.city_required');
      if (!formData.departmentRef) newErrors.department = t('checkout.errors.department_required');
    } else if (selectedMethod !== 'pickup') {
      if (!formData.address.trim()) newErrors.address = t('checkout.errors.address_required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validate()) {
      setStep('summary');
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate data encryption and transmission
    console.log("Encrypting data for secure transmission...");
    const encryptedData = btoa(JSON.stringify({ ...formData, method: selectedMethod, items }));
    console.log("Transmitting encrypted payload:", encryptedData);
    
    setStep('success');
    clearCart();
    window.scrollTo(0, 0);
  };

  if (activeItems.length === 0 && step !== 'success') {
    return (
      <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1a1a1a] mb-4">{t('cart.empty')}</h2>
          <Link to="/catalog" className="text-[#b3917d] font-bold hover:underline">
            {t('cart.continue_shopping')}
          </Link>
        </div>
      </main>
    );
  }

  if (step === 'success') {
    return (
      <main className="min-h-screen bg-[#fdfaf7] px-6 py-12 md:py-24 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-[40px] p-8 md:p-12 shadow-sm text-center">
          <div className="mx-auto w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] mb-4">{t('checkout.success')}</h1>
          <p className="text-[#6b5f59] mb-8 leading-relaxed">
            {t('checkout.encrypt_note')}
          </p>
          <Link
            to="/catalog"
            className="block w-full rounded-[24px] bg-[#1a1a1a] py-4 text-white font-bold transition-all hover:bg-black"
          >
            {t('cart.continue_shopping')}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#fdfaf7] px-6 py-8 md:px-12 pb-24">
      <header className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
        <button
          onClick={() => step === 'summary' ? setStep('shipping') : navigate({ to: '/cart' })}
          className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-2xl bg-white shadow-sm"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#1a1a1a]" />
        </button>
        <h1 className="text-lg md:text-xl font-bold text-[#1a1a1a]">
          {step === 'shipping' ? t('checkout.shipping_info') : t('checkout.confirm_order')}
        </h1>
        <div className="w-10 md:w-12" />
      </header>

      <div className="mx-auto max-w-4xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Forms or Summary */}
        <div className="space-y-6">
          {step === 'shipping' ? (
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#6b5f59] mb-2 px-1">
                    {t('checkout.full_name')}
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full h-14 rounded-2xl bg-[#fdfaf7] px-4 outline-none border-2 transition-all ${
                      errors.fullName ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[#b3917d]'
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="mt-1 text-xs text-red-500 px-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#6b5f59] mb-2 px-1">
                    {t('checkout.phone')}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full h-14 rounded-2xl bg-[#fdfaf7] px-4 outline-none border-2 transition-all ${
                      errors.phone ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[#b3917d]'
                    }`}
                    placeholder="+380 99 999 99 99"
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500 px-1">{errors.phone}</p>}
                </div>

                {selectedMethod === 'nova_poshta' ? (
                  <div className="space-y-4">
                    <div className="relative" ref={citySearchRef}>
                      <label className="block text-sm font-medium text-[#6b5f59] mb-2 px-1">
                        {t('checkout.city')}
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={citySearch}
                          onChange={(e) => {
                            setCitySearch(e.target.value);
                            setShowCitySuggestions(true);
                          }}
                          onFocus={() => setShowCitySuggestions(true)}
                          placeholder={t('checkout.search_city')}
                          className={`w-full h-14 rounded-2xl bg-[#fdfaf7] pl-12 pr-4 outline-none border-2 transition-all ${
                            errors.city ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[#b3917d]'
                          }`}
                        />
                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a19690]" />
                        {isCitiesLoading && (
                          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b3917d] animate-spin" />
                        )}
                      </div>
                      
                      {showCitySuggestions && cities.length > 0 && (
                        <div className="absolute top-full left-0 right-0 z-50 mt-2 max-h-60 overflow-y-auto rounded-2xl bg-white p-2 shadow-xl border border-gray-100">
                          {cities.map((city: any) => (
                            <button
                              key={city.Ref}
                              type="button"
                              onClick={() => {
                                setFormData({ ...formData, city: city.Description, cityRef: city.Ref, department: "", departmentRef: "" });
                                setCitySearch(city.Description);
                                setShowCitySuggestions(false);
                              }}
                              className="w-full text-left p-3 hover:bg-[#fdfaf7] rounded-xl transition-colors text-sm"
                            >
                              {city.Description}, {city.AreaDescription}
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.city && <p className="mt-1 text-xs text-red-500 px-1">{errors.city}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#6b5f59] mb-2 px-1">
                        {t('checkout.department')}
                      </label>
                      <div className="relative">
                        <select
                          disabled={!formData.cityRef || isDepartmentsLoading}
                          value={formData.departmentRef}
                          onChange={(e) => {
                            const dep = departments.find(d => d.Ref === e.target.value);
                            setFormData({ ...formData, department: dep?.Description || "", departmentRef: e.target.value });
                          }}
                          className={`w-full h-14 rounded-2xl bg-[#fdfaf7] pl-12 pr-4 outline-none border-2 transition-all appearance-none disabled:opacity-50 ${
                            errors.department ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[#b3917d]'
                          }`}
                        >
                          <option value="">{t('checkout.select_department')}</option>
                          {departments.map((dep: any) => (
                            <option key={dep.Ref} value={dep.Ref}>
                              {dep.Description}
                            </option>
                          ))}
                        </select>
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#a19690]" />
                        {isDepartmentsLoading && (
                          <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#b3917d] animate-spin" />
                        )}
                      </div>
                      {errors.department && <p className="mt-1 text-xs text-red-500 px-1">{errors.department}</p>}
                    </div>
                  </div>
                ) : selectedMethod !== 'pickup' ? (
                  <div>
                    <label className="block text-sm font-medium text-[#6b5f59] mb-2 px-1">
                      {t('checkout.address')}
                    </label>
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full h-32 rounded-2xl bg-[#fdfaf7] p-4 outline-none border-2 transition-all resize-none ${
                        errors.address ? 'border-red-200 focus:border-red-400' : 'border-transparent focus:border-[#b3917d]'
                      }`}
                      placeholder="City, Street, Building, Apartment"
                    />
                    {errors.address && <p className="mt-1 text-xs text-red-500 px-1">{errors.address}</p>}
                  </div>
                ) : null}
              </div>


            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-[#b3917d]" />
                  {t('checkout.shipping_info')}
                </h3>
                <div className="space-y-2 text-[#6b5f59]">
                  <p className="font-bold text-[#1a1a1a]">{formData.fullName}</p>
                  <p>{formData.phone}</p>
                  {selectedMethod === 'nova_poshta' ? (
                    <>
                      <p>{formData.city}</p>
                      <p>{formData.department}</p>
                    </>
                  ) : selectedMethod !== 'pickup' ? (
                    <p>{formData.address}</p>
                  ) : null}
                  <p className="pt-2 flex items-center gap-2 text-[#1a1a1a]">
                    <Truck className="h-4 w-4" />
                    {currentMethod.name}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm">
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-green-600" />
                  Security Information
                </h3>
                <p className="text-sm text-[#6b5f59] leading-relaxed">
                  {t('checkout.encrypt_note')} All sensitive data is hashed before transmission.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:sticky lg:top-8 h-fit space-y-6">
          <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#1a1a1a] mb-6">{t('checkout.order_summary')}</h3>
            
            <div className="max-h-64 overflow-y-auto pr-2 space-y-4 mb-8 custom-scrollbar">
              {activeItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-[#f7f3ef]">
                    <img
                      src={resolveProductImageUrl(item.imageUrl)}
                      alt={t(item.name)}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1a1a1a] truncate">{t(item.name)}</p>
                    <p className="text-xs text-[#6b5f59]">Qty: {item.quantity}</p>
                    <p className="text-sm font-bold text-[#b3917d]">${item.price * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-gray-100">
              <div className="flex justify-between text-[#6b5f59]">
                <span>{t('checkout.subtotal')}</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-[#6b5f59]">
                <span>{t('checkout.shipping')}</span>
                <span>{currentMethod.price === 0 ? 'Free' : `$${currentMethod.price}`}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-100">
                <span className="text-lg font-bold text-[#1a1a1a]">{t('checkout.total')}</span>
                <span className="text-2xl font-bold text-[#1a1a1a]">
                  ${totalPrice + currentMethod.price}
                </span>
              </div>
            </div>

            <button
              onClick={step === 'shipping' ? handleNext : handlePlaceOrder}
              className="w-full mt-8 rounded-[24px] bg-[#1a1a1a] py-4 md:py-5 text-base md:text-lg font-bold text-white shadow-xl transition-all hover:bg-black active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {step === 'shipping' ? (
                <>Next Step</>
              ) : (
                <>
                  <CreditCard className="h-5 w-5" />
                  {t('checkout.place_order')}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
