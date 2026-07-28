import {
  BadgeCheck,
  Phone,
  MessageCircle,
  Mail,
  Clock3,
  User,
} from "lucide-react";

const OwnerCard = ({ property }) => {
  const ownerName = property.owner_name || "Property Owner";
  const phone = property.phone || "";
  const email = property.owner_email || "";

  return (
    <section className="mt-12">
      <h2 className="mb-8 text-3xl font-bold">Property Owner</h2>

      <div className="rounded-3xl bg-white p-8 shadow-lg">
        {/* Owner Info */}

        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100">
            <User size={42} className="text-blue-600" />
          </div>

          <div>
            <h3 className="text-2xl font-bold">{ownerName}</h3>

            <div className="mt-2 flex items-center gap-2 text-green-600">
              <BadgeCheck size={18} />
              Verified Owner
            </div>

            <p className="mt-2 text-slate-500">Registered Property Owner</p>
          </div>
        </div>

        {/* Trust Information */}

        <div className="mt-8 grid grid-cols-2 gap-6">
          <div className="rounded-xl bg-slate-50 p-5">
            <Clock3 className="mb-3 text-blue-600" />

            <p className="font-semibold">Response Time</p>

            <p className="text-slate-500">Usually replies quickly</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <BadgeCheck className="mb-3 text-green-600" />

            <p className="font-semibold">Verification</p>

            <p className="text-slate-500">Contact Verified</p>
          </div>
        </div>

        {/* Contact Buttons */}

        <div className="mt-8 space-y-4">
          <a
            href={`tel:${phone}`}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-blue-600 py-4 font-semibold !text-white transition hover:bg-blue-700"
          >
            <Phone size={20} />
            Call Owner
          </a>

          <a
            href={`https://wa.me/${phone.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-green-600 py-4 font-semibold !text-white transition hover:bg-green-700"
          >
            <MessageCircle size={20} />
            WhatsApp
          </a>

          <a
            href={`mailto:${email}`}
            className="flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-300 py-4 font-semibold transition hover:bg-slate-100"
          >
            <Mail size={20} />
            Send Email
          </a>
        </div>
      </div>
    </section>
  );
};

export default OwnerCard;
