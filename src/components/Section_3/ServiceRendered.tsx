import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";

// Define the type for the service
type GoldMaterial = {
  name: string;
  location: string;
  description: string;
  alternateImage: string;
  image: string;
};

// Define an array of gold materials
const goldMaterials: GoldMaterial[] = [
  {
    name: "Stacks of Raw Gold",
    location: "New York, USA",
    description:
      "Large stacks of raw gold bars shipped to New York for refining and processing.",
    alternateImage: "/Assets/images/ServicesDone/stack2.jpg",
    image: "/Assets/images/ServicesDone/stack1.jpg",
  },
  {
    name: "Gold Jewelry Collection",
    location: "Paris, France",
    description:
      "Exquisite collection of gold jewelry pieces shipped to Paris for a luxury fashion show.",
    alternateImage: "/Assets/images/ServicesDone/GJ1.jpg",
    image: "/Assets/images/ServicesDone/GJ2.jpg",
  },
  {
    name: "Gold Bullion Bars",
    location: "London, UK",
    description:
      "High-quality gold bullion bars transported to London for investment purposes.",
    alternateImage: "/Assets/images/ServicesDone/bullion2.jpg",
    image: "/Assets/images/ServicesDone/bullion.jpg",
  },
  {
    name: "Gold Coins",
    location: "Zurich, Switzerland",
    description:
      "Rare gold coins shipped to Zurich for auction at a prestigious numismatic event.",
    alternateImage: "/Assets/images/ServicesDone/coinNeck.jpg",
    image: "/Assets/images/ServicesDone/coinNeck2.jpg",
  },
  {
    name: "Gold Leaf Sheets",
    location: "Dubai, UAE",
    description:
      "Luxurious gold leaf sheets transported to Dubai for embellishing architectural designs.",
    alternateImage: "/Assets/images/ServicesDone/stack3.jpg",
    image: "/Assets/images/ServicesDone/stack4.jpg",
  },
  {
    name: "Gold processing Equipment",
    location: "Perth, Australia",
    description:
      "Specialized gold mining equipment shipped to Perth for use in mining operations.",
    alternateImage: "/Assets/images/ServicesDone/processing1.jpg",
    image: "/Assets/images/ServicesDone/processing2.jpg",
  },
];

const GoldMaterialsShipped: React.FC = () => {
  const [activeImage, setActiveImage] = useState("");
  // Function to handle image click
  const handleImageClick = (image: string) => {
    setActiveImage(image);
  };

  return (
    <div id="section5" className='container mx-auto px-4 py-8'>
      <h2 className='text-3xl font-semibold mb-4'>
        Multimillion Dollar Business Gold and Gold Materials Shipped
      </h2>{" "}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {goldMaterials.map((material, index) => (
          <div
            key={index}
            className='bg-white rounded-lg shadow-lg overflow-hidden'>
            <div className=' hover:cursor-pointer group  flex flex-col'>
              <img
                src={
                  activeImage === material.image
                    ? material.image
                    : material.alternateImage
                }
                alt={material.name}
                className='w-full h-56 object-cover hover:scale-95'
              />
              <FaArrowRight
                onClick={() =>
                  handleImageClick(
                    activeImage === material.image
                      ? material.alternateImage
                      : material.image,
                  )
                }
                size={50}
                className=' self-end group-hover:block hidden cursor-pointer animate-pulse text-yellow-200 '
              />
            </div>
            <div className='p-4'>
              <h3 className='text-xl font-semibold mb-2'>{material.name}</h3>
              <p className='text-gray-600 mb-2'>{material.location}</p>
              <p className='text-gray-600 mb-4'>{material.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoldMaterialsShipped;
