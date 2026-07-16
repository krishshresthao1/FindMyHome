import { MapPin, ShieldCheck, BedDouble, Bath, Wallet } from "lucide-react";

const PropertyHero = ({ property }) => {
  return (
    <section className="grid grid-cols-12 gap-10">
      {/* LEFT */}

      <div className="col-span-8">
        <img
          src={property.image}
          alt={property.title}
          className="h-[520px] w-full rounded-3xl object-cover"
        />

        <div className="mt-4 grid grid-cols-4 gap-4">
          {property.gallery.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${property.title} ${index + 1}`}
              className="h-28 rounded-2xl object-cover"
            />
          ))}
        </div>
      </div>

      {/* RIGHT */}

      <div className="col-span-4">
        {property.verified && (
          <span className="rounded-full bg-green-100 px-4 py-2 font-semibold text-green-700">
            <ShieldCheck className="mr-2 inline" size={18} />
            Verified Owner
          </span>
        )}

        <h1 className="mt-5 text-4xl font-bold">{property.title}</h1>

        <div className="mt-3 flex items-center gap-2 text-slate-500">
          <MapPin size={18} />
          {property.location}
        </div>

        <div className="mt-6 text-5xl font-bold text-blue-600">
          Rs.{property.price.toLocaleString()}
          <span className="text-xl text-slate-500">/month</span>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-5">
          <div className="rounded-xl bg-slate-100 p-4">
            <BedDouble />
            <p className="mt-2">{property.rooms.bedrooms} Rooms</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <Bath />
            <p className="mt-2">{property.rooms.bathroomType} Bathroom</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            <Wallet />
            <p className="mt-2">Security Deposit</p>
          </div>

          <div className="rounded-xl bg-slate-100 p-4">
            🚽
            <p className="mt-2">{property.rooms.toiletStyle} Toilet</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHero;
