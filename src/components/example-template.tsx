import { ReactElement } from "react";

interface Props {
  title: string;
  paragraph: string;
  content?: ReactElement;
}

export function ExampleTemplate(props: Props) {
  return (
    <>
      <h1>{props.title}</h1>
      <p>{props.paragraph}</p>
      {props.content}
    </>
  );
}
