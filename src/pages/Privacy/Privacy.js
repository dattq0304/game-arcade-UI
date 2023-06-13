import classNames from "classnames/bind";

import styles from "./Privacy.module.scss";

const cx = classNames.bind(styles);

function Privacy() {
  return <div className={cx("wrapper")}>
    <div className={cx("inner")}>

      <p>
        Privacy is of utmost importance to us at our online gaming website. We understand the need for safeguarding your personal information and ensuring a secure gaming environment. This Privacy Policy outlines how we collect, use, and protect the information you provide while using our platform.
      </p>

      <h2 className={cx("title")}>1. Information we collect:</h2>
      <div className={cx("content")}>
        <p>
          Personal information: When you register an account, we may collect certain personal details such as your name, email address, and age to verify your identity and provide personalized gaming experiences.
        </p>
        <p>
          Usage information: We collect data related to your interactions with our platform, including game preferences, gameplay history, and device information. This information helps us improve our services and tailor game recommendations to suit your interests.
        </p>
      </div>

      <h2 className={cx("title")}>2. Use of information:</h2>
      <div className={cx("content")}>
        <p>
          Enhancing your gaming experience: We utilize the information we collect to provide you with personalized gameplay, recommend games, and improve our services based on your preferences.
        </p>
        <p>
          Communication: We may use your email address to send important updates, notifications, and promotional offers related to our platform. You have the option to opt out of marketing communications at any time.
        </p>
        <p>
          Security and fraud prevention: We employ robust security measures to protect your information from unauthorized access, fraud, and misuse.
        </p>
      </div>

      <h2 className={cx("title")}>3. Data sharing:</h2>
      <div className={cx("content")}>
        <p>
          Third-party service providers: We may share your information with trusted third-party service providers who assist us in delivering our services. These providers are obligated to maintain the confidentiality and security of your data.
        </p>
        <p>
          Legal requirements: We may disclose your information when required by law, to comply with legal processes, or to protect our rights, safety, and the rights of others.
        </p>
      </div>


      <h2 className={cx("title")}>4. Cookies and tracking technologies:</h2>
      <div className={cx("content")}>
        <p>
          We use cookies and similar tracking technologies to enhance your browsing experience, analyze trends, and gather statistical data. You have the option to manage your cookie preferences through your browser settings.
        </p>
      </div>

      <h2 className={cx("title")}>5. Children's privacy:</h2>
      <div className={cx("content")}>
        <p>
          We do not knowingly collect personal information from individuals under the age of 13. If we become aware that we have inadvertently collected information from a child, we will take immediate steps to delete it.
        </p>
      </div>

      <p>
        Please note that while we take every precaution to protect your information, no method of data transmission or storage can be guaranteed as 100% secure. We encourage you to review our full Privacy Policy for more detailed information on how we handle and protect your data.
      </p>

      <p>
        By using our online gaming platform, you acknowledge and consent to the collection, use, and storage of your information as outlined in this Privacy Policy. Your trust is essential to us, and we are committed to upholding the highest standards of privacy and data security.
      </p>

    </div>
  </div >
}

export default Privacy;