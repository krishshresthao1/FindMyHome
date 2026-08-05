import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useParams } from "react-router-dom";

import PropertyHero from "../components/property/PropertyDetails/PropertyHero";
import PropertyInformation from "../components/property/PropertyDetails/PropertyInformation";
import NearbyPlaces from "../components/property/PropertyDetails/NearbyPlaces";
import PropertyLocation from "../components/property/PropertyDetails/PropertyLocation/PropertyLocation";
import OwnerCard from "../components/property/OwnerCard/OwnerCard";

import { useNavigate } from "react-router-dom";


import {
  getPropertyById,
  startConversationV2,
  sendPropertyMessageV2,
  sendMessageV2,
} from "../services/api";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const navigate = useNavigate();

const handleChatOwner = async () => {
  try {
    const token = localStorage.getItem("token");

    // Create conversation
    const response = await startConversationV2(
      {
        property_id: property._id,
      },
      token,
    );

    const conversationId = response.data.conversation_id;

    const isNew = response.data.is_new;

    // Send property card only for new conversation
    if (isNew) {
      // Send property card
      await sendPropertyMessageV2(
        {
          property_id: property._id,
          conversation_id: conversationId,
        },
        token,
      );

      // Send initial text message
      await sendMessageV2(
        {
          receiver_id: property.owner_id,
          property_id: property._id,
          message: `Hello, I am interested in your property "${property.title}". Is it still available? I would like to know more details.`,
        },
        token,
      );
    }

    // Open Messages page
    navigate("/messages", {
      state: {
        conversationId,
      },
    });
  } catch (error) {
    console.error("Failed to start conversation:", error);
  }
};

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await getPropertyById(id);

        setProperty(response.data);
      } catch (error) {
        console.error("Failed to load property:", error);
      }
    };

    fetchProperty();
  }, [id]);

  if (!property) {
    return <div className="py-20 text-center text-xl">Loading property...</div>;
  }

  return (
    <section className="bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-6">


        <PropertyHero property={property} onChat={handleChatOwner} />

        <PropertyInformation property={property} />

        <NearbyPlaces property={property} />

        <PropertyLocation property={property} />

      </div>
    </section>
  );
};

export default PropertyDetails;
