import classNames from "classnames/bind";

import styles from "./Terms.module.scss";

const cx = classNames.bind(styles);

function Terms() {
  return <div className={cx("wrapper")}>
    <div className={cx("inner")}>

      <p>
        Welcome to our online gaming platform! Before you start using our services, we kindly ask you to review and agree to the following Terms and Conditions. These terms outline your rights and responsibilities as a user of our website. By accessing and using our platform, you signify your acceptance of these terms. If you do not agree with any part of these terms, please refrain from using our services.
      </p>

      <h2 className={cx("title")}>1. Account Registration:</h2>
      <div className={cx("content")}>
        <p>
          a. To access certain features of our platform, you may be required to create an account. You must provide accurate and up-to-date information during the registration process.
        </p>
        <p>
          b. You are solely responsible for maintaining the confidentiality of your account credentials and are liable for all activities that occur under your account.
        </p>
        <p>
          c. You must be at least 13 years old to create an account. If you are under the age of 18, you confirm that you have obtained parental consent to use our services.
        </p>
      </div>

      <h2 className={cx("title")}>2. User Conduct:</h2>
      <div className={cx("content")}>
        <p>
          a. You agree to use our platform in compliance with all applicable laws, regulations, and these Terms and Conditions.
        </p>
        <p>
          b. You will not engage in any activity that may disrupt, interfere with, or compromise the security and integrity of our platform, including but not limited to hacking, introducing viruses, or attempting unauthorized access.
        </p>
        <p>
          c. You will not engage in any form of abusive, offensive, or harassing behavior towards other users or our staff. We promote a respectful and inclusive environment for all users.
        </p>
      </div>

      <h2 className={cx("title")}>3. Intellectual Property:</h2>
      <div className={cx("content")}>
        <p>
          a. Our platform and all its contents, including games, graphics, logos, and trademarks, are protected by intellectual property laws. You agree not to reproduce, distribute, modify, or create derivative works based on our content without obtaining proper authorization.
        </p>
        <p>
          b. You retain ownership of any content you submit to our platform, but by submitting it, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, distribute, and display the content in connection with our services.
        </p>
      </div>

      <h2 className={cx("title")}>4. In-Game Purchases:</h2>
      <div className={cx("content")}>
        <p>
          a. Our platform may offer in-game purchases or virtual goods for real or virtual currency. By making such purchases, you acknowledge that they are non-refundable and non-transferable.
        </p>
        <p>
          b. You must comply with any additional terms and conditions related to in-game purchases, including age restrictions and usage limitations.
        </p>
      </div>

      <h2 className={cx("title")}>5. Termination:</h2>
      <div className={cx("content")}>
        <p>
          a. We reserve the right to suspend, terminate, or restrict your access to our platform at our sole discretion, without prior notice or liability, for any reason, including but not limited to violations of these Terms and Conditions.
        </p>
        <p>
          b. Upon termination, any rights and licenses granted to you will cease, and you must immediately cease all use of our platform.
        </p>
      </div>

      <h2 className={cx("title")}>6. Limitation of Liability:</h2>
      <div className={cx("content")}>
        <p>
          a. We strive to provide a reliable and secure platform, but we do not guarantee uninterrupted access or freedom from errors or viruses.
        </p>
        <p>
          b. To the extent permitted by law, we shall not be liable for any direct, indirect, incidental, consequential, or exemplary damages arising out of your use or inability to use our platform.
        </p>
      </div>

      <h2 className={cx("title")}>7. Modifications:</h2>
      <div className={cx("content")}>
        <p>
          We reserve the right to modify, update, or change these Terms and Conditions at any time without prior notice. Any changes will be effective upon posting on our website. It is your responsibility to review these terms periodically.
        </p>
      </div>

      <p>
        These Terms and Conditions constitute the entire agreement between you and us regarding your use of our platform. If any provision of these terms is deemed invalid or unenforceable, the remaining provisions shall remain in full force and effect.
      </p>

      <p>
        Thank you for taking the time to read and understand our Terms and Conditions. If you have any questions or concerns, please contact our customer support team for assistance.
      </p>

    </div>
  </div>
}

export default Terms;