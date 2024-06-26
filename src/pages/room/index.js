import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, X } from "react-feather";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Chip from "../../components/chip";
import { useRoomContext } from "../../context";
import Button from "../../components/button";
import Image from "../../components/image";
import Loading from "../../components/loading";
import resources from "../constants";

// RoomPage component definition
export default function RoomPage() {
  const { rooms, isLoading } = useRoomContext();
  const { roomId } = useParams();

  const [, setSearchParams] = useSearchParams();

  // Extracting parameters from the URL
  // const { roomId } = useParams();

  // State for the currently selected photo index and image modal state
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  // Retrieve room data based on roomId
  // const room = cardsData[roomId];

  // Hook for navigation
  const navigate = useNavigate();

  const room = rooms.find((room) => room.id === roomId);
  if (isLoading || !room) {
    return <Loading className="w-screen h-screen" />;
  }

  const photos = [room.image2, room.image3, room.image4];

  // Function to close the page
  const handleClose = () => {
    navigate("/dashboard");
  };

  // Function to handle clicking on an image
  const handleImageClick = (index) => {
    setSelectedPhoto(index);
    setIsImageModalOpen(true);
  };

  // Function to handle closing the image modal
  const handleModalClose = () => {
    setIsImageModalOpen(false);
  };

  const handleNextPhoto = () => {
    setSelectedPhoto((state) => (state === photos.length - 1 ? 0 : state + 1));
  };
  const handlePrevPhoto = () => {
    setSelectedPhoto((state) => (state === 0 ? photos.length - 1 : state - 1));
  };

  // JSX structure for the RoomPage component
  return (
    <div className="h-screen w-screen flex flex-row overflow-hidden">
      <div className="bg-white w-1/3">
        <div className="h-full justify-center ml-auto flex flex-col p-20 gap-8 items-center text-center max-w-2xl">
          {/* Displaying room title */}
          <div className="text-black text-5xl font-bold">{room.title}</div>
          {/* Displaying rating and reviewer */}
          <div className="flex flex-row gap-2 items-center text-[#444444] text-2xl">
            <Star className="w-7 h-7 fill-current text-palette-accent" />
            <span className="font-bold">{room.rating}</span>
            <span className="rounded">{room.location}</span>
          </div>
          {/* Displaying room features */}
          <div className="flex flex-wrap gap-2 justify-center">
            {room.features.map((feature, index) => (
              <Chip key={index}>{feature}</Chip>
            ))}
          </div>
          {/* Displaying room description */}
          <div className="text-palette-gray-600 whitespace-pre-line">
            {room.description}
          </div>
          {/* Displaying room price */}
          <div className="text-1xl font-bold">
            Price per night: € {room.price}
          </div>
          <Button
            variant="primary"
            className="text-md py-3"
            onClick={(e) => {
              e.preventDefault();
              setSearchParams((params) => {
                params.set("bookingId", roomId); // Setting bookingId parameter
                return params;
              });
            }}
          >
            {resources.label_book_now}
          </Button>
        </div>
      </div>
      <div className="w-2/3 my-auto relative select-none">
        {/* Button to close the page */}
        <div
          className="absolute top-0 right-0 p-2 cursor-pointer hover:bg-gray-200 hover:scale-110 rounded-full m-2 transition-all"
          onClick={handleClose}
        >
          <X className="w-18 h-18" />
        </div>
        <div className="max-w-7xl p-20 h-full">
          <div className="w-full pb-8 relative">
            {/* Button to navigate to previous image */}
            <ChevronLeft
              onClick={handlePrevPhoto}
              className="absolute top-[calc(50%-16px)] left-4 p-2 w-8 h-8 bg-white rounded-full opacity-75 hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
            />
            {/* Button to navigate to next image */}
            <ChevronRight
              onClick={handleNextPhoto}
              className="absolute top-[calc(50%-16px)] right-4 p-2 w-8 h-8 bg-white rounded-full opacity-75 hover:opacity-100 hover:scale-105 transition-all cursor-pointer"
            />
            {/* Displaying the selected image */}
            <Image
              src={photos[selectedPhoto]}
              alt={room.alt}
              className="rounded-lg object-cover w-full h-auto aspect-video select-none cursor-pointer"
              onClick={() => setIsImageModalOpen(true)}
            />
          </div>
          {/* Displaying thumbnail images */}
          <div className="flex flex-row gap-8 w-full">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="flex-1 cursor-pointer hover:scale-105 transition-all"
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={photo}
                  alt={room.alt}
                  className="rounded-lg object-cover aspect-video"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Image Modal */}
      {isImageModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex justify-center items-center select-none">
          <div className="max-w-screen-lg w-full relative">
            {/* Displaying the enlarged image */}
            <img
              src={photos[selectedPhoto]}
              alt={room.alt}
              className="rounded-lg object-contain w-full h-full cursor-pointer"
              onClick={handleModalClose}
            />
            {/* Button to navigate to previous image in modal */}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-4 cursor-pointer bg-white rounded-full opacity-75 hover:opacity-100 hover:scale-105"
              onClick={handlePrevPhoto}
            >
              <ChevronLeft className="w-8 h-8 text-grey " />
            </div>
            {/* Button to navigate to next image in modal */}
            <div
              className="absolute top-1/2 -translate-y-1/2 right-4 cursor-pointer bg-white rounded-full opacity-75 hover:opacity-100 hover:scale-105"
              onClick={handleNextPhoto}
            >
              <ChevronRight className="w-8 h-8 text-grey" />
            </div>
            {/* Button to close the modal */}
            <div
              className="absolute top-4 right-4 cursor-pointer"
              onClick={handleModalClose}
            >
              <X className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
