import styles from './index.less';

const Footer = () => {
  return (
    <div className={styles.customGlobalFooter}>
      <div className={styles.customGlobalFooterCopyright}>
        &copy;All Right Reserved. <br/>浙江太美医疗科技股份有限公司
      </div>
    </div>
  );
};

export default Footer;
