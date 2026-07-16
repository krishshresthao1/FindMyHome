import {
  BadgeCheck,
  Phone,
  MessageCircle,
  Mail,
  Clock3,
  User,
} from "lucide-react";

const OwnerCard = ({ property }) => {
  const owner = property.owner;

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">Property Owner</h2>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <User size={42} className="text-blue-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">{owner.name}</h3>

            {owner.verified && (
              <div className="mt-2 flex items-center gap-2 text-green-600">
                <BadgeCheck size={18} />
                Verified Owner
              </div>
            )}

            <p className="mt-2 text-slate-500">
              Member since {owner.memberSince}
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-slate-50 p-5">
            <Clock3 className="mb-3 text-blue-600" />

            <p className="font-semibold">Average Response Time</p>

            <p className="text-slate-500">Within 10 Minutes</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <BadgeCheck className="mb-3 text-green-600" />

            <p className="font-semibold">Verification</p>

            <p className="text-slate-500">Phone & Identity Verified</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <a
            href={`tel:${owner.phone}`}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-700"
          >
            <Phone size={20} />
            Call Owner
          </a>

          <a
            href={`https://wa.me/${owner.whatsapp}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>

          <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 py-4 font-semibold transition hover:bg-slate-100">
            <Mail size={20} />
            Send Message
          </button>
        </div>
      </div>
    </section>
  );
};

export default OwnerCard;
