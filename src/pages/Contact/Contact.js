import classNames from "classnames/bind";

import styles from "./Contact.module.scss";

const cx = classNames.bind(styles);

function Contact() {
  return <div className={cx("wrapper")}>
    <div className={cx("inner")}>

      <p>We value open communication with our users and encourage you to reach out to us with any questions, concerns, or feedback you may have. Our dedicated support team is here to assist you and ensure that your gaming experience is enjoyable and seamless.</p>
      <p>Here are the various ways you can contact us:</p>

      <h2 className={cx("title")}>1. Customer Support:</h2>
      <div className={cx("content")}>
        <p>
          If you require assistance or have any inquiries, our customer support team is available to help you. You can reach out to them by sending an email to <a>support@datlive.site</a>. Our team strives to respond promptly and provide you with the necessary support.
        </p>
      </div>

      <h2 className={cx("title")}>2. Social Media:</h2>
      <div className={cx("content")}>
        <p>
          Stay connected with us through our social media channels. We regularly share updates, news, and announcements about our platform and games. Feel free to engage with us on platforms such as Facebook, Twitter, and Instagram. You can find the links to our social media profiles on our website.
        </p>
      </div>

      <h2 className={cx("title")}>3. Feedback and Suggestions:</h2>
      <div className={cx("content")}>
        <p>
          We greatly value your feedback and suggestions as they help us improve our platform and provide a better gaming experience. If you have any ideas, feature requests, or general feedback, you can submit them through the feedback form on our website. Your input is invaluable to us, and we appreciate you taking the time to share your thoughts.
        </p>
      </div>

      <p>
        We are committed to ensuring your satisfaction and strive to address your concerns promptly. Your experience is important to us, and we are constantly working to enhance our services based on user feedback. Don't hesitate to contact us whenever you need assistance or have something to share. We look forward to hearing from you and making your gaming journey with us even more enjoyable.
      </p>

    </div>
  </div>
}

export default Contact;