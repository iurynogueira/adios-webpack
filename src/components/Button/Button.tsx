import React, { InputHTMLAttributes, useState } from "react";

export interface IonButton extends InputHTMLAttributes<HTMLButtonElement> {
  label: string
}

const IonButton = (props: IonButton) => {
  const [selected, useSelected] = useState(false)
  return (
    <div>
      <button>{props.label}</button>
    </div>
  )
}

export default IonButton
