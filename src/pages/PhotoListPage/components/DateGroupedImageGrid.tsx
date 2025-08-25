import { PhotosByDateType } from '@/types/photoType';
import { format } from 'date-fns';

const DateGroupedImageGrid = ({ date, photos }: PhotosByDateType) => {
  return (
    <div className="flex flex-col p-5 gap-5">
      <h6>{format(date, 'yyyy.MM.dd')}</h6>
      <div className="grid grid-cols-5 gap-3 justify-center">
        {photos.map(({ photoId, photoUrl }) => (
          <img
            key={photoId}
            src={photoUrl}
            alt={`photo-${photoId}`}
            className="w-full shrink-0 cursor-pointer aspect-square object-cover border border-strokeGray"
          />
        ))}
      </div>
    </div>
  );
};

export default DateGroupedImageGrid;
