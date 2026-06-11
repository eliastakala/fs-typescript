interface HeaderProps {
  course: string;
}

export const Header = (props: HeaderProps) => {
  return <h1>{props.course}</h1>;
};