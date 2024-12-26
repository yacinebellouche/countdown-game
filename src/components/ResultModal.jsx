/*
In older React version we must use the forwardRef function that allows to pass a ref to a function
*/
import { useImperativeHandle, useRef } from "react";
/*the createPortal allows to manipulate the dom and push the component in a specific place/div */
import { createPortal } from "react-dom";
export default function ResultModal({
  ref,
  onReset,
  targetTime,
  remainingTime,
}) {
  const userLost = remainingTime <= 0;

  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const dialog = useRef();
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  /*This allows to create and handle functions that are related to the referenced object */
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current.showModal();
      },
    };
  });

  return createPortal(
    <dialog ref={dialog} className="result-modal" onClose={onReset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your: Score: {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds.</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong> {formattedRemainingTime} seconds left.</strong>
      </p>
      <form action="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById("modal")
  );
}
