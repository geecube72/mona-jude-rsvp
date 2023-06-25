import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Home(props) {
  const rsvpValue = useRef(1);
  const guestCount = useRef(1);
  const [sheetValue, setSheetValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [inputContainer, setInputContainer] = useState([]);
  const [imgUrl, setImgUrl] = useState("");

  useEffect(() => {
    if (!props.hashtag || props.hashtag !== "MonaJudeNi") {
      setError(true);
      setLoading(false);
    } else {
      guestCount.current = 1;
    }
  }, [props]);

  useEffect(() => {
    setImgUrl(`${window.location.origin}/img/mona-jude.jpg`);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!guestCount.current) {
        alert("No guests");
        return;
      }

      let guestData = [];
      const boolString = Number(rsvpValue.current) === 1 ? "Yes" : "No";

      for (let x = 0; x < guestCount.current; x++) {
        const el = document.getElementById(`guest-${x + 1}`);
        guestData.push([el.value, boolString]);
      }

      try {
        setSubmitting(true);

        await axios.post(`api/append-row`, { guestData });

        setSheetValue(boolString);
      } catch (error) {
        console.log(error.response);
        setError(true);
      } finally {
        setSubmitting(false);
      }
    },
    [props]
  );

  const btnClassName =
    "font-dancing-script text-2xl px-6 py-2 font-semibold rounded-full bg-brand text-white text-center";

  const handleGuestCount = (e) => {
    guestCount.current = e.target.value;
  };

  const handleOnChange = (e) => {
    rsvpValue.current = e.target.value;
  };

  const handleRequestGuest = () => {
    const count = guestCount.current;

    if (count > 5) {
      alert("Maximum of 5 guests per request only.");
      window.location.reload();
      return;
    }

    if (count <= 0) {
      alert("Minimum of 1 guest.");
      window.location.reload();
      return;
    }

    let guestComponents = [];

    for (let x = 0; x < count; x++) {
      guestComponents.push(
        <div className="mb-3" key={x}>
          <label className="form-check-label">
            {count > 1 ? `Guest #${x + 1}` : "Guest's"} Full Name:
          </label>
          <input
            type="text"
            className="px-4 h-10  rounded-lg w-full border border-solid accent-brand-dark border-gray-300 bg-white mt-1 align-top bg-no-repeat bg-center bg-contain float-left"
            required={true}
            id={`guest-${x + 1}`}
            name={`guest-${x + 1}`}
          />
        </div>
      );
    }
    setInputContainer(guestComponents);
  };

  const LoadingComponent = () => {
    return (
      <div
        className={
          "h-full md:h-screen flex justify-center items-center mx-auto"
        }
        style={{ maxWidth: 400 }}
      >
        <div className="text-3xl w-full text-center flex-col">
          <div className={"px-10 py-20"}>
            <h1
              className="font-dancing-script font-bold text-4xl tracking-wider text-brand-dark"
              style={{ lineHeight: "3rem" }}
            >
              {"Loading ..."}
            </h1>
          </div>
        </div>
      </div>
    );
  };

  const ErrorComponent = () => {
    return (
      <div
        className={"h-full md:h-screen flex justify-center items-center"}
        style={{
          maxWidth: 650,
          marginRight: "auto",
          marginLeft: "auto",
        }}
      >
        <div className="text-3xl w-full text-center flex-col">
          <div className={"px-10 py-20"}>
            <h1
              className="font-dancing-script font-bold tracking-wider text-brand-dark"
              style={{ lineHeight: "3rem" }}
            >
              Sorry, either the page you are searching is not available or the
              server is encountering errors. Please try again.
            </h1>
          </div>
          <div>
            <button
              className={btnClassName}
              onClick={() => (window.location.href = "/?hashtag=MonaJudeNi")}
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  };

  const NoAnswerComponent = () => {
    return (
      <div
        className={
          "h-full md:h-screen flex justify-center items-center mx-auto"
        }
        style={{ maxWidth: 400 }}
      >
        <div className="text-3xl w-full text-center flex-col">
          <div className={"px-10 py-20"}>
            <h1
              className="font-dancing-script font-bold text-4xl tracking-wider text-brand-dark mb-10"
              style={{ lineHeight: "3rem" }}
            >
              We understand!
            </h1>
            <h5 className="font-montserrat font-bold text-2xl tracking-wider text-brand-dark mb-2">
              Thank you for your response. We hope to see you soon!
            </h5>
          </div>
        </div>
      </div>
    );
  };

  const YesAnswerComponent = () => {
    return (
      <div className="h-full md:h-screen flex flex-col items-center justify-center">
        <div className="w-full mx-auto" style={{ maxWidth: 500 }}>
          <img src={imgUrl} alt="mona-jude-bg" loading="lazy" />
        </div>
        <div
          className={"h-auto mt-10 flex justify-center items-center mx-auto"}
          style={{ maxWidth: 500 }}
        >
          <div className="text-3xl w-full text-center flex-col">
            <div className={"px-10"}>
              <h1
                className="font-dancing-script font-bold text-5xl tracking-wider text-brand mb-8"
                style={{ lineHeight: "3rem" }}
              >
                Thank you for your response! We are looking forward to see you!
              </h1>
              <h2 className="font-montserrat tracking-wider text-brand-dark mb-2">
                {"#MonaJudeNi! <3"}
              </h2>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FormComponent = () => {
    return (
      <div
        className={
          "h-full md:h-screen flex justify-center items-center mx-auto pt-16"
        }
        style={{ maxWidth: 500 }}
      >
        <div className="w-full text-center flex-col px-5">
          <div>
            <h1
              className="font-dancing-script font-bold text-5xl tracking-wider text-brand"
              style={{ lineHeight: "3rem" }}
            >
              "I have found the one whom my soul loves."
            </h1>
            <p className="mt-2 font-dancing-script font-bold text-4xl tracking-wider text-brand">
              {"- Song of Salomon 3:4"}
            </p>
          </div>
          <div className={"mt-10"}>
            <span className="font-montserrat text-2xl text-brand-dark">
              <span className="font-montserrat text-3xl">#MonaJudeNi!</span> on
              8 August 2023
            </span>
          </div>
          <div className="mx-auto mt-6" style={{ maxWidth: 400 }}>
            {!inputContainer.length ? (
              <div
                className={
                  "font-montserrat text-lg mb-8 text-left flex flex-col text-brand-dark"
                }
              >
                <div className="mt-6">
                  <label className="form-check-label">
                    Enter Number of Guests:
                  </label>
                  <input
                    type="number"
                    className="px-4 h-10 rounded-lg w-full border border-solid accent-brand-dark border-gray-300 bg-white mt-1 align-top bg-no-repeat bg-center bg-contain float-left"
                    onChange={handleGuestCount}
                    name="num-guests"
                    min={1}
                    max={5}
                    defaultValue={1}
                  />
                </div>
                <div className="flex justify-center mt-8">
                  <button className={btnClassName} onClick={handleRequestGuest}>
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center justify-center">
                  <div className="font-montserrat text-2xl mb-8 text-brand">
                    So... will you RSVP?
                  </div>
                  <div
                    className={
                      "font-montserrat text-lg mb-10 text-left flex flex-col text-brand-dark"
                    }
                  >
                    <div className="flex mb-3">
                      <input
                        onChange={handleOnChange}
                        className="rounded-full h-4 w-4 border accent-brand-dark border-gray-300 bg-white mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        value={1}
                        id="flexRadioDefault1"
                        checked={true}
                      />
                      <label
                        className="form-check-label inline-block"
                        htmlFor="flexRadioDefault1"
                      >
                        Yes, will gladly accept.
                      </label>
                    </div>
                    <div className="flex">
                      <input
                        onChange={handleOnChange}
                        className="w-4 h-4 rounded-full border accent-brand-dark border-gray-300 bg-white focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                        type="radio"
                        name="flexRadioDefault"
                        value={0}
                        id="flexRadioDefault2"
                      />
                      <label
                        className="inline-block flex-1"
                        htmlFor="flexRadioDefault2"
                      >
                        No, will celebrate from afar.
                      </label>
                    </div>
                  </div>
                  <div
                    className={
                      "font-montserrat text-lg mb-10 text-left flex flex-col text-brand-dark"
                    }
                  >
                    {inputContainer}
                  </div>
                  <div className={"pb-10 flex gap-4"}>
                    <button
                      disabled={submitting}
                      className={btnClassName}
                      type="submit"
                    >
                      Submit Response
                    </button>
                    <button
                      disabled={submitting}
                      className={btnClassName}
                      onClick={(e) => {
                        e.preventDefault();
                        setInputContainer([]);
                        guestCount.current = 1;
                      }}
                    >
                      Go Back
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (submitting || loading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent />;
  }

  if (sheetValue === "No" && !error && !loading) {
    return <NoAnswerComponent />;
  }

  if (sheetValue === "Yes" && !error && !loading) {
    return <YesAnswerComponent />;
  }

  if (!loading && !sheetValue && !error) {
    return <FormComponent />;
  }
}

Home.getInitialProps = async (ctx) => {
  return ctx.query;
};
