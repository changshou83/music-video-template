function BlurToFocusEffect({ duration }: { duration?: number }) {
  return (
    <div className="blur-to-focus-effect">
      <div className="blur-to-focus-effect__content">
        <h1>Blur to Focus Effect</h1>
        <p>{duration}</p>
        <p>
          This is a simple example of a blur to focus effect using CSS and
          JavaScript.
        </p>
      </div>
    </div>
  );
}

export default BlurToFocusEffect;
