export default function Enemies({ circleY }) {
  return (
    <>
      <circle data-name="enemy" fill="red" r={20} cx={250} cy={circleY} />
      <circle
        data-name="enemy"
        fill="blue"
        r={18}
        cx={100}
        cy={circleY + 100}
      />
      <circle
        data-name="enemy"
        fill="purple"
        r={16}
        cx={400}
        cy={circleY + 60}
      />
    </>
  );
}
