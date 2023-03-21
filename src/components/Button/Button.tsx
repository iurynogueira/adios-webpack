import React, { InputHTMLAttributes } from "react";

export interface IonButton extends InputHTMLAttributes<HTMLButtonElement> {
  label: string
}

const IonButton = (props: IonButton) => {
  return (
    <div>
      <button>{props.label}</button>
    </div>
  )
}

export default IonButton
