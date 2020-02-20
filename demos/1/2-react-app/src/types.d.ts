interface ISearchRequest {
  searchQuery: string;
}

type Experience = {
  url: string;
  title: string;
  height: number;
  width: number;
};

type ExperienceLog = {
  title: string;
  experiences: Experience[];
  isFavorite: boolean;
};

type SearchSubmission = (value: ISearchRequest) => void;

type UpdateArchive = React.Dispatch<React.SetStateAction<IArchive>>;

interface IArchive {
  [experience: string]: ExperienceLog;
}

interface ISearch {
  onSubmit: SearchSubmission;
}

interface IInteractiveHeader {
  onSubmit: SearchSubmission;
}

interface IGallery {
  archive: IArchive;
}

interface IItem {
  experience: Experience;
}

interface ILike {
  on?: boolean;
  onClick?: (event: MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface IFavorites {
  archive: IArchive;
  updateArchive: UpdateArchive;
}
