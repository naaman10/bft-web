import Image from "next/image";
import Link from "next/link";
import {
  SERVICE_IMAGE_GROUP,
  SERVICE_IMAGE_HOME_ED,
  SERVICE_IMAGE_ONE_TO_ONE,
} from "@/lib/service-images";
import { LOCAL_AREA } from "@/lib/site-location";

interface ServiceItem {
  title: string;
  description: string;
  /** Link to a service page; omit if content comes from CMS without a URL */
  href?: string;
  /** Optional hero image (e.g. Cloudinary) */
  imageSrc?: string;
  iconName?: string;
}

interface ServicesProps {
  headline: string;
  /** Pass entries from CMS; empty array falls back to built-in services */
  services?: ServiceItem[];
}

const defaultServices: ServiceItem[] = [
  {
    title: "1:1 Sessions",
    description:
      `Personalised one-to-one tuition tailored to your child’s pace, goals and confidence in 11+ Prep, Maths, Reading, SPaG and more.`,
    href: "/services/one-to-one",
    imageSrc: SERVICE_IMAGE_ONE_TO_ONE,
  },
  {
    title: "Group Sessions",
    description:
      `Small, collaborative groups that keep learning engaging—with peer support and plenty of practice.`,
    href: "/services/group",
    imageSrc: SERVICE_IMAGE_GROUP,
  },
  {
    title: "Home-ed Sessions",
    description:
      `Structured support that fits your home education routine, with consistent teaching across core subjects—supporting home-ed families.`,
    href: "/services/home-ed",
    imageSrc: SERVICE_IMAGE_HOME_ED,
  },
];

export function Services({ headline, services }: ServicesProps) {
  const items =
    services && services.length > 0 ? services : defaultServices;

  return (
    <section id="services" className="py-16 md:py-24 bg-[#f9fafb]">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-3xl font-semibold text-center text-slate-900 mb-4">
          {headline}
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-base text-slate-600">
          Our tutoring services are available to families in and around the{" "}
          {LOCAL_AREA} area.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {items.map((service, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-center shadow-sm"
            >
              <div className="relative aspect-[4/3] w-full bg-gradient-to-br from-primary-50/80 via-white to-secondary-50/70">
                {service.imageSrc ? (
                  <Image
                    src={service.imageSrc}
                    alt={service.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain object-center p-4 sm:p-6"
                  />
                ) : (
                  <div className="flex h-full min-h-0 w-full items-center justify-center bg-gradient-to-br from-primary-100 via-white to-secondary-100 p-4 sm:p-6 text-sm font-semibold text-primary-700">
                    Home-ed support
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
              <h3 className="text-2xl font-semibold text-primary-600 mb-2">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm flex-1 mb-4">
                {service.description}
              </p>
              {service.href ? (
                <Link
                  href={service.href}
                  className="inline-flex items-center justify-center rounded-xl bg-primary-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
                >
                  Learn more
                </Link>
              ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
