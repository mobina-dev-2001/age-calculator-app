import React from "react";
import arrowIcon from "./assets/images/icon-arrow.svg";
import AnimatedNumber from "./components/AnimatedNumber";

function App() {
  const [age, setAge] = React.useState({
    calculatedYears: "- -",
    calculatedMonths: "- -",
    calculatedDays: "- -",
  });
  const [dayInput, setDayInput] = React.useState("");
  const [monthInput, setMonthInput] = React.useState("");
  const [yearInput, setYearInput] = React.useState("");
  const [errors, setErrors] = React.useState({ year: "", month: "", day: "" });

  const handleCalc = (e) => {
    e.preventDefault();

    const newErrors = { day: "", month: "", year: "" };

    const d = parseInt(dayInput, 10);
    const m = parseInt(monthInput, 10);
    const y = parseInt(yearInput, 10);

    if (!dayInput) newErrors.day = "This field is required";
    if (!monthInput) newErrors.month = "This field is required";
    if (!yearInput) newErrors.year = "This field is required";

    if (dayInput && (d < 1 || d > 31)) newErrors.day = "Must be a valid day";
    if (monthInput && (m < 1 || m > 12))
      newErrors.month = "Must be a valid month";
    if (yearInput && y > new Date().getFullYear())
      newErrors.year = "Must be in the past";

    if (!newErrors.day && !newErrors.month && !newErrors.year) {
      const birthDate = new Date(y, m - 1, d);

      if (
        birthDate.getFullYear() !== y ||
        birthDate.getMonth() + 1 !== m ||
        birthDate.getDate() !== d
      ) {
        newErrors.day = "Must be a valid date";
      } else if (birthDate >= new Date()) {
        newErrors.year = "Must be in the past";
      }
    }

    setErrors(newErrors);

    if (newErrors.day || newErrors.month || newErrors.year) {
      return;
    }

    let today = new Date(),
      year = today.getFullYear(),
      month = today.getMonth() + 1,
      day = today.getDate();

    if (day < d) {
      month -= 1;
      day += new Date(year, month, 0).getDate();
    }
    if (month < m) {
      year -= 1;
      month += 12;
    }

    setAge({
      calculatedYears: year - y,
      calculatedMonths: month - m,
      calculatedDays: day - d,
    });
  };

  return (
    <section className="bg-white">
      <form className="d-flex" id="ageForm" onSubmit={handleCalc}>
        <div className="d-grid">
          <label
            className={`${
              errors.day === "" ? "text-dove-gray" : "text-persimmon"
            } bold uppercase letter-spacing-large`}
            htmlFor="dayInput"
          >
            Day
          </label>
          <input
            className="fs-medium bold uppercase"
            style={
              errors.day === ""
                ? null
                : { borderColor: "hsl(var(--clr-persimmon))" }
            }
            id="dayInput"
            name="day"
            type="number"
            placeholder="dd"
            value={dayInput}
            onChange={(e) => setDayInput(e.target.value)}
            aria-describedby={errors.day ? "dayError" : undefined}
            aria-invalid={!!errors.day}
          />
          <p
            className="alert-message text-persimmon italic"
            id="dayError"
            role="alert"
            aria-live="assertive"
          >
            {errors.day}
          </p>
        </div>
        <div className="d-grid">
          <label
            className={`${
              errors.month === "" ? "text-dove-gray" : "text-persimmon"
            } bold uppercase letter-spacing-large`}
            htmlFor="monthInput"
          >
            Month
          </label>
          <input
            className="fs-medium bold uppercase"
            style={
              errors.month === ""
                ? null
                : { borderColor: "hsl(var(--clr-persimmon))" }
            }
            id="monthInput"
            name="month"
            type="number"
            placeholder="mm"
            value={monthInput}
            onChange={(e) => setMonthInput(e.target.value)}
            aria-describedby={errors.month ? "monthError" : undefined}
            aria-invalid={!!errors.month}
          />
          <p
            className="alert-message text-persimmon italic"
            id="monthError"
            role="alert"
            aria-live="assertive"
          >
            {errors.month}
          </p>
        </div>
        <div className="d-grid">
          <label
            className={`${
              errors.year === "" ? "text-dove-gray" : "text-persimmon"
            } bold uppercase letter-spacing-large`}
            htmlFor="yearInput"
          >
            Year
          </label>
          <input
            className="fs-medium bold uppercase"
            style={
              errors.year === ""
                ? null
                : { borderColor: "hsl(var(--clr-persimmon))" }
            }
            id="yearInput"
            name="year"
            type="number"
            placeholder="yyyy"
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            aria-describedby={errors.year ? "yearError" : undefined}
            aria-invalid={!!errors.year}
          />
          <p
            className="alert-message text-persimmon italic"
            id="yearError"
            role="alert"
            aria-live="assertive"
          >
            {errors.year}
          </p>
        </div>
      </form>

      <div className="submitBtn-container">
        <button
          className="bg-electric-violet"
          form="ageForm"
          type="submit"
          aria-label="Calculate"
        >
          <img src={arrowIcon} alt="Arrow Icon" aria-hidden={true} />
        </button>
      </div>

      <div className="output-container d-grid" role="status" aria-live="polite">
        <p className="fs-extra-large extra-bold italic letter-spacing-small">
          {typeof age.calculatedYears === "number" ? (
            <AnimatedNumber value={age.calculatedYears} />
          ) : (
            <span className="calculated-age text-electric-violet">- -</span>
          )}
          years
        </p>

        <p className="fs-extra-large extra-bold italic letter-spacing-small">
          {typeof age.calculatedMonths === "number" ? (
            <AnimatedNumber value={age.calculatedMonths} />
          ) : (
            <span className="calculated-age text-electric-violet">- -</span>
          )}
          months
        </p>

        <p className="fs-extra-large extra-bold italic letter-spacing-small">
          {typeof age.calculatedDays === "number" ? (
            <AnimatedNumber value={age.calculatedDays} />
          ) : (
            <span className="calculated-age text-electric-violet">- -</span>
          )}
          days
        </p>
      </div>
    </section>
  );
}

export default App;
