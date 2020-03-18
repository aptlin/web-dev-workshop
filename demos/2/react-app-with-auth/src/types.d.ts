interface ArchiveState {
  [experience: string]: ExperienceLog;
}

type ArchiveDispatch = (
  action: GalleryAction | ArchiveAction
) => void | Promise<void>;

interface GalleryState {
  state: ArchiveState;
  dispatch: ArchiveDispatch;
}

type ArchiveActionType = "update" | "delete" | "clear";

interface ArchiveAction {
  type: ArchiveActionType;
  data: ArchiveState;
}

interface GalleryAction {
  type: "fetch" | ArchiveActionType;
  data: SearchRequest;
}

type GalleryDispatch = (
  action: GalleryAction | ArchiveAction
) => void | Promise<void>;

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

type SearchSubmission = (value: SearchRequest) => void;

type UpdateArchive = React.Dispatch<React.SetStateAction<ArchiveState>>;

interface GalleryProps {
  log: ExperienceLog;
}

interface ItemProps {
  experience: Experience;
}

interface LikeProps {
  on?: boolean;
  onClick?: (event: MouseEvent<HTMLSpanElement, MouseEvent>) => void;
}

interface MoodieProps {
  experienceName: string;
}

interface MoodieFetcherProps {
  dispatch: ArchiveDispatch;
  searchRequest: SearchRequest;
}

interface SearchRequest {
  searchQuery: string;
  limit: number;
  offset: number;
  rating: string;
  lang: string;
}
