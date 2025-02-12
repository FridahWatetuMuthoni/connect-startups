export type StartUp = {
  _id: string;
  title: string;
  slug: string;
  datePublished: Date;
  author: {
    _id: string;
    name: string;
    image: string;
    bio: string;
  };
  views: string;
  description: string;
  pitch: string;
  category: string;
  image: string;
};
