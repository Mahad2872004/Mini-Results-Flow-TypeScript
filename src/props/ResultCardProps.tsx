export default interface ResultCardProps {
  title: string;
  headline: string;
  copy: string;
  callout?: string;
  onNext: () => void;
  onBack: () => void;
  step: number;
  prevTitle: string | null;
  image?: string;
}