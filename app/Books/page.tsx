import styles from './books.module.css';
import BookGrid from '@/components/Books/BookGrid';


export default function Books() {
    

    return (
        <div className={styles.booksPageContainer}>
            <BookGrid />
        </div>
    );
}
