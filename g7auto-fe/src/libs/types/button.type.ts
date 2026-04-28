export interface ButtonProps {
  title: string;
  type: "button" | "submit" | "reset";
  action: string;
  style?: React.CSSProperties;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  isLoading?: boolean;
  refShow?: string[];
}
