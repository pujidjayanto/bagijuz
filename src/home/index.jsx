import Hero from './hero'
import FormSection from './form';

export default function Home() {
  const checkboxes = [];
  for (let i = 1; i <= 30; i++) {
    checkboxes.push(
      <div key={i}>
        <input type="checkbox" id={`checkbox-${i}`} />
        <label htmlFor={`checkbox-${i}`}>{i}</label>
      </div>
    );
  }

  return (
    <>
      <Hero/>
      <FormSection/>
    </>
  )
}