export interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category?: string;
  images: {
    col1_top?: string;
    col1_bottom?: string;
    col2_tall: string;
  };
  col1_top_card?: {
    title: string;
    subtitle?: string;
  };
  col1_bottom_card?: {
    text: string;
  };
  link?: string;
  buttonText?: string;
}

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
}
