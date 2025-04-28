import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    // Define googleTranslateElementInit globally
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    // Clean up function to remove script on unmount (optional)
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
