import clsx from "clsx"; // A utility for constructing className strings conditionally
import { useSearchParams } from "react-router-dom"; // Hook to access the URL query parameters
import Button from "../../components/button"; // Custom Button component
import Card from "../../components/card"; // Custom Card component
import Chip from "../../components/chip"; // Custom Chip component
import { Star } from "react-feather"; // Icon component
import { useRoomContext } from "../../context";

// Function component for displaying booking confirmation details
function Confirmation(props) {
  // Destructuring the setSearchParams hook from useSearchParams
  const [, setSearchParams] = useSearchParams();

  // Retrieving room details from the constant data using the id passed as props
  const { rooms, duration } = useRoomContext();
  const room = rooms.at(props.id);

  if (!room) {
    return <>Loading...</>;
  }

  // Calculating the duration of stay in days
  const days = Math.round(
    (new Date(duration?.to).getTime() - new Date(duration?.from).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  // Rendering the confirmation details
  return (
    <Card className="m-20 rounded-lg w-auto max-w-4xl">
      {/* Displaying room image */}
      <Card.Image
        src={room.image}
        alt={room.alt}
        className="rounded-none rounded-l-lg h-full w-2/5"
      />
      {/* Displaying confirmation details */}
      <Card.Body className="px-6 py-10 w-3/5">
        <div className="font-bold text-4xl text-center">Booking Confirmed</div>
        <div className="font-bold text-3xl text-center">Enjoy Your Stay !</div>
        <div className="bg-[#C3C2C2] bg-opacity-30 px-4 py-6 rounded-lg text-center flex flex-col gap-4">
          <div className="text-[#3E4958] text-xl font-bold">{room.title}</div>
          <div className="bg-[#DBDBFE] rounded-full p-2 font-bold">
            {/* Displaying booking dates */}
            {new Date(duration?.from).toLocaleDateString()} -{" "}
            {new Date(duration?.to).toLocaleDateString()}
          </div>
          <div className="justify-center flex items-center gap-2 text-[#444444]">
            {/* Displaying star rating */}
            <Star className="w-4 h-4 fill-current text-[#4200FF]" />
            <span className="font-bold">{room.rating}</span>
            <span className="rounded">{room.location}</span>
          </div>
          <div className="justify-center flex flex-wrap gap-2 pb-2">
            {/* Displaying room features as chips */}
            {room.features.map((feature, index) => (
              <Chip
                key={index}
                className="group-hover:bg-white transition-colors"
              >
                {feature}
              </Chip>
            ))}
          </div>
          {/* Horizontal rule for visual separation */}
          <hr className="h-0.5 border-t-0 bg-neutral-200" />
          {/* Displaying cost calculation */}
          <div className="text-m">
            Calculation: € {room.price} x {days} days
          </div>
          {/* Displaying total cost including taxes */}
          <div className="text-m font-bold">
            Total Cost (incl. Taxes): € {room.price * days}
          </div>
        </div>
        {/* Button for navigating back to dashboard */}
        <div className="justify-end ml-auto">
          <Button
            onClick={() => {
              // Function to remove 'confirmationId' from URL parameters
              setSearchParams((params) => {
                params.delete("confirmationId");
                return params;
              });
            }}
          >
            Back To Dashboard
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

// Main component for the confirmation page
export default function ConfirmationPage() {
  // Retrieving search parameters from the URL
  const [searchParams] = useSearchParams();
  // Extracting 'confirmationId' from search parameters
  const confirmationId = searchParams.get("confirmationId");

  // Rendering the confirmation page or hiding it based on confirmationId presence
  return (
    <div
      className={clsx(
        "z-20 h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-65",
        {
          hidden: confirmationId == null,
        }
      )}
    >
      <div className="flex justify-center">
        {/* Rendering Confirmation component if confirmationId is present */}
        {confirmationId != null && <Confirmation id={confirmationId} />}
      </div>
    </div>
  );
}
