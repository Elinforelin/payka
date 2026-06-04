import { createFileRoute, Link } from "@tanstack/react-router";

import img from "@/assets/7812354786123547.png";
import img2 from "@/assets/5346354635465.png";
import img3 from "@/assets/45875674576754.png";
import img4 from "@/assets/2345413523454.png";

export const Route = createFileRoute("/about")({ component: AboutPage });

function AboutPage() {
  return (
    <main className="min-h-screen px-6 py-8">
      <section className="mx-auto max-w-md space-y-6 rounded-3xl bg-white p-6 shadow-xl">
        <div className="space-y-2 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#a48574]">
            Моя історія
          </p>
          <h1 className="text-2xl font-semibold text-[#2f2a27]">
            Створено для тихої розкоші
          </h1>
          <p className="text-sm text-[#6b5f59]">
            Мої прикраси народжуються повільно. Без поспіху, без плану,
            дозволяючи формі бути такою, якою вона хоче.
          </p>
        </div>

        <div className="rounded-2xl bg-[#f7f2ee] p-4 text-sm text-[#6b5f59]">
          Це прикраси для тих, хто любить тишу в деталях, тепло ручної роботи і
          красу, яку не потрібно пояснювати.
        </div>

        <div>
          <h2 className="text-sm font-semibold">Вироби</h2>
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { src: img2, alt: "Кільця" },
              { src: img3, alt: "Сережки" },
              { src: img4, alt: "Підвіси" },
            ].map((img) => (
              <div
                key={img.alt}
                className="aspect-square overflow-hidden rounded-2xl bg-[#f2e9e2]"
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-[#6b5f59]">
            Кожна прикраса народжується з нуля - без копій, без повторів, без
            ідеальних форм.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Майстриня</h2>
          <div className="flex gap-4 rounded-2xl bg-[#f7f2ee] p-4">
            <div className="w-28 shrink-0 overflow-hidden rounded-2xl bg-[#eadfd7]">
              <img
                src={img}
                alt="Founder jeweler portrait"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="text-sm text-[#6b5f59]">
              <p className="text-sm font-semibold text-[#2f2a27]">Аліна</p>
              <p className="mt-1 text-xs">
                Переважно працюю над кільцями, бо це прикраса, яку я
                використовую кожен день. Частіше за все роблю мінімалістичні,
                зручні, на кожен день, щоб і спати в них, і в гори, і на річку
                купатись.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Ідеї, які стоять за брендом</h2>
          <div className="grid grid-cols-1 gap-3 text-sm">
            {[
              {
                title: "Простота з наміром",
                body: "Мої прикраси народжуються повільно. Без поспіху, без плану, дозволяючи формі бути такою, якою вона хоче.",
              },
              {
                title: "Речі, що відчуваються особистими",
                body: "Тут немає симетрії — є відчуття.",
              },
              {
                title: "Матеріали, що довговічні",
                body: "Це прикраси для тих, хто любить тишу в деталях, тепло ручної роботи і красу, яку не потрібно пояснювати.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl bg-[#f7f2ee] p-4">
                <p className="text-sm font-semibold text-[#2f2a27]">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-[#6b5f59]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-semibold">Details</h2>
          <div className="grid grid-cols-2 gap-3 text-xs">
            {[
              ["Матеріали", "925 срібло"],
              ["Обробка", "Поліровані та покриті родієм"],
              ["Унікальність", "Кожна прикраса виготовляється вручну"],
              ["Принципи", "Натурані рослинні матеріали"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-2xl bg-[#f7f2ee] p-3">
                <p className="font-semibold text-[#2f2a27]">{label}</p>
                <p className="mt-1 text-[#6b5f59]">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl bg-[#efe6df] p-4 text-center text-sm">
          <p className="text-[#6b5f59]">
            Запрошую на сторінку подивитись, відчути, трохи напаятись і обрати
            прикрасу серденьком
          </p>
          <Link
            to="/"
            className="mt-3 inline-block rounded-full bg-[#a48574] px-6 py-2 text-xs font-semibold text-white"
          >
            Ознайомитися з колекцією
          </Link>
        </div>
      </section>
    </main>
  );
}
