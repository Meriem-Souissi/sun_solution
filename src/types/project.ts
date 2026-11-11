export type Project = {
  id: string;
  category:
    | "Résidentiel"
    | "Collectivité"
    | "Centrale"
    | "Agriculture"
    | "Off-Grid";
  kwc: number;
  gov: string;
  title: string;
  description: string;
  image: string;
  isFeatured?: boolean;
};
