import { formatDistanceToNow } from 'date-fns';
import { enUS } from 'date-fns/locale';


export const timeAgo = (timestamp: string): string => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: enUS });
};