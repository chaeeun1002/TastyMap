import styles from "../styles/ScrollToTopButton.module.css";

const ScrollToTopButton = () => {
  // ページのトップにスクロールする関数
  const scrollToTop = () => {
    // スクロールをページの最上部(top: 0)へスムーズに移動
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button className={styles.scrollButton} onClick={scrollToTop}>
      TOP
    </button>
  );
};

export default ScrollToTopButton;
