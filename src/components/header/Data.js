const dataSet=[
    {
      topic:"order",
      content: [
        {
          id: 1,
          title: "Q: How can I track my order?",
          content:
            "Once your order is placed, you will receive a confirmation email or SMS with a tracking link. You can also track your order in real-time by logging into your account and visiting the 'Track My Order' section.",
        },
        {
            id: 2,
            title: "Q: How fast will my order be delivered?",
            content:
              "We deliver your order within 1 hour of confirmation! Our delivery system is designed for ultra-fast dispatch, ensuring you get your clothes and essentials quickly",
          },
          {
            id: 3,
            title: "Q: What should I do if my order is delayed?",
            content:
              "While we strive to deliver within 1 hour, there may be occasional delays due to traffic or high demand. If your order is late, please check the tracking page for real-time updates. You can also contact our customer support for assistance.",
          },
          {
            id: 4,
            title: "Q: Can I change my delivery address after placing the order?",
            content:
              "If your order is not yet out for delivery, you can update your delivery address by contacting our support team. However, once the order is dispatched, address changes may not be possible.",
          },
          {
            id: 5,
            title: "Q: What happens if I'm not available to receive my order?",
            content:
              "If you’re unavailable at the time of delivery, our rider will attempt to contact you. You can reschedule within the next 30 minutes. If we are unable to reach you, the order will be returned, and a refund may be processed as per our cancellation policy.",
          },
      ],
    },

        {
          topic: "cancellationsAndModifications",
          content: [
            {
              id: 1,
              title: "Q: Can I cancel my order after placing it?",
              content:
                "Yes, you can cancel your order within the first 5 minutes of placing it. After this period, the order might already be processed and sent for delivery, making cancellation impossible.",
            },
            {
              id: 2,
              title: "Q: How do I modify my order after placing it?",
              content:
                "You can modify your order within 5 minutes of placing it by contacting our customer support. Once the order is processed, modifications may not be possible.",
            },
            {
              id: 3,
              title: "Q: Will I get a refund if I cancel my order?",
              content:
                "If you cancel within the allowed time, you will receive a full refund. Refunds are processed within 24-48 hours and will be credited back to your original payment method.",
            },
            {
              id: 4,
              title: "Q: Can I change my delivery address after placing the order?",
              content:
                "You can request an address change before the order is dispatched. Once it's out for delivery, address modifications may not be possible.",
            },
            {
              id: 5,
              title: "Q: What happens if I receive a damaged or incorrect item?",
              content:
                "If you receive a damaged or incorrect item, you can request a return or replacement by contacting customer support within 24 hours of delivery.",
            },
            {
              id: 6,
              title: "Q: How can I check the status of my cancellation or modification request?",
              content:
                "You can check the status of your request by logging into your account and visiting the 'My Orders' section or by reaching out to our customer support team.",
            },
          ],
        },
   
      
        {
            topic: "trialshopyCredit",
            content: [
              {
                id: 1,
                title: "Q: What is Trialshopy Credit?",
                content:
                  "Trialshopy Credit is a digital wallet balance that can be used for purchases on our platform. You can earn it through refunds, promotions, or cashback rewards.",
              },
              {
                id: 2,
                title: "Q: How can I earn Trialshopy Credit?",
                content:
                  "You can earn Trialshopy Credit through eligible refunds, cashback offers, and special promotions. Keep an eye on our offers section for more details.",
              },
              {
                id: 3,
                title: "Q: How do I use my Trialshopy Credit for purchases?",
                content:
                  "During checkout, you can select Trialshopy Credit as your payment method. If the credit balance is insufficient, you can pay the remaining amount using other payment methods.",
              },
              {
                id: 4,
                title: "Q: Does Trialshopy Credit expire?",
                content:
                  "Yes, Trialshopy Credit may have an expiration date depending on the promotional terms. Check your account for expiry details on your credit balance.",
              },
              {
                id: 5,
                title: "Q: Can I transfer my Trialshopy Credit to another account?",
                content:
                  "No, Trialshopy Credit is non-transferable and can only be used within your registered Trialshopy account.",
              },
              {
                id: 6,
                title: "Q: What happens if my order is canceled? Will I get my credit back?",
                content:
                  "Yes, if your order is canceled and you used Trialshopy Credit, the credited amount will be refunded back to your Trialshopy Credit balance.",
              },
            ],
          },
          {
            topic: "phonePeWallet",
            content: [
              {
                id: 1,
                title: "Q: Can I use PhonePe Wallet for payments on Trialshopy?",
                content:
                  "Yes, you can use your PhonePe Wallet to make payments for your orders on Trialshopy. Simply select PhonePe Wallet as your payment option during checkout.",
              },
              {
                id: 2,
                title: "Q: How do I add money to my PhonePe Wallet?",
                content:
                  "You can add money to your PhonePe Wallet through linked bank accounts, UPI, or debit/credit cards directly from the PhonePe app.",
              },
              {
                id: 3,
                title: "Q: What happens if my order is canceled? Will I get a refund in my PhonePe Wallet?",
                content:
                  "Yes, if your order is canceled and you used PhonePe Wallet for payment, the refund will be credited back to your PhonePe Wallet as per our refund policy.",
              },
              {
                id: 4,
                title: "Q: Can I use PhonePe Wallet along with another payment method?",
                content:
                  "Currently, you can either pay the full amount using PhonePe Wallet or combine it with other payment methods if your wallet balance is insufficient.",
              },
              {
                id: 5,
                title: "Q: Are there any extra charges for using PhonePe Wallet?",
                content:
                  "No, there are no additional charges for using PhonePe Wallet for transactions on Trialshopy.",
              },
              {
                id: 6,
                title: "Q: Can I transfer my PhonePe Wallet balance to my bank account?",
                content:
                  "Yes, you can withdraw your PhonePe Wallet balance to your linked bank account using the PhonePe app, subject to their terms and conditions.",
              },
            ],
          },
          {
            topic: "giftCard",
            content: [
              {
                id: 1,
                title: "Q: Can I purchase a gift card on Trialshopy?",
                content:
                  "Yes, you can purchase Trialshopy gift cards for your friends and family. They can be used to shop for any products available on our platform.",
              },
              {
                id: 2,
                title: "Q: How do I redeem my Trialshopy gift card?",
                content:
                  "To redeem your gift card, enter the gift card code at checkout in the payment section. The gift card balance will be applied to your order total.",
              },
              {
                id: 3,
                title: "Q: Can I use multiple gift cards for a single order?",
                content:
                  "Yes, you can use multiple gift cards on a single order. If the total order amount exceeds the gift card balance, you can pay the remaining amount using another payment method.",
              },
              {
                id: 4,
                title: "Q: What happens if I cancel an order paid with a gift card?",
                content:
                  "If you cancel an order paid with a gift card, the refund amount will be credited back to the same gift card for future use.",
              },
              {
                id: 5,
                title: "Q: Do Trialshopy gift cards expire?",
                content:
                  "Yes, Trialshopy gift cards have an expiration date mentioned at the time of purchase. Please ensure to use them before the expiry date.",
              },
              {
                id: 6,
                title: "Q: Can I transfer my gift card balance to my bank account?",
                content:
                  "No, the balance in a Trialshopy gift card cannot be transferred to a bank account. It can only be used for purchases on Trialshopy.",
              },
            ],
          },
          {
            topic: "giftWrapping",
            content: [
              {
                id: 1,
                title: "Q: Does Trialshopy offer gift wrapping services?",
                content:
                  "Yes, Trialshopy offers a premium gift wrapping service for select products. You can choose this option at checkout.",
              },
              {
                id: 2,
                title: "Q: How can I request gift wrapping for my order?",
                content:
                  "During checkout, you will see an option to add gift wrapping. Simply select this option, and we will wrap your order before delivery.",
              },
              {
                id: 3,
                title: "Q: Is there an extra charge for gift wrapping?",
                content:
                  "Yes, a small additional charge may apply for gift wrapping, depending on the size and type of the product.",
              },
              {
                id: 4,
                title: "Q: Can I include a personalized message with my gift wrap?",
                content:
                  "Absolutely! You can add a personalized message, which will be printed on a beautiful gift card and included with the package.",
              },
              {
                id: 5,
                title: "Q: Can I gift wrap only some items in my order?",
                content:
                  "Yes, you can select specific items in your order for gift wrapping while leaving others unwrapped.",
              },
              {
                id: 6,
                title: "Q: What happens if I need to return a gift-wrapped item?",
                content:
                  "You can return a gift-wrapped item just like any other product. However, the gift wrap fee is non-refundable.",
              },
            ],
          },
          {
            topic: "donation",
            content: [
              {
                id: 1,
                title: "Q: Does Trialshopy support donations?",
                content:
                  "Yes, Trialshopy allows customers to donate to various charitable causes at checkout. You can choose from our list of verified organizations.",
              },
              {
                id: 2,
                title: "Q: How can I donate while placing an order?",
                content:
                  "At checkout, you will find an option to add a donation to your order. Simply select the amount you wish to contribute and proceed with payment.",
              },
              {
                id: 3,
                title: "Q: Can I donate without making a purchase?",
                content:
                  "Yes, you can make a direct donation without purchasing any items. Visit our donation page to contribute to a cause of your choice.",
              },
              {
                id: 4,
                title: "Q: Are donations refundable?",
                content:
                  "No, donations made through Trialshopy are non-refundable. Once processed, the amount is directly transferred to the respective charitable organization.",
              },
              {
                id: 5,
                title: "Q: Will I receive a receipt for my donation?",
                content:
                  "Yes, you will receive an email confirmation with a donation receipt after your contribution is successfully processed.",
              },
              {
                id: 6,
                title: "Q: Can I choose which charity my donation goes to?",
                content:
                  "Yes, Trialshopy provides a list of trusted charities, and you can select where your donation should be directed during checkout.",
              },
            ],
          },
          {
            topic: "cardTokenization",
            content: [
              {
                id: 1,
                title: "Q: What is card tokenization?",
                content:
                  "Card tokenization is a security process that replaces your actual card details with a unique token, ensuring safe and encrypted transactions.",
              },
              {
                id: 2,
                title: "Q: How does Trialshopy use card tokenization?",
                content:
                  "Trialshopy uses card tokenization to securely store your card details for faster and safer payments without exposing sensitive information.",
              },
              {
                id: 3,
                title: "Q: Is card tokenization mandatory for online payments?",
                content:
                  "Yes, as per RBI guidelines, card tokenization is mandatory for storing card details securely while making payments on online platforms.",
              },
              {
                id: 4,
                title: "Q: Do I need to tokenize my card for every purchase?",
                content:
                  "No, once your card is tokenized, you can use the saved token for future purchases without re-entering your card details.",
              },
              {
                id: 5,
                title: "Q: Can I remove or manage my tokenized cards?",
                content:
                  "Yes, you can manage or delete your tokenized cards from the payment settings on your Trialshopy account.",
              },
              {
                id: 6,
                title: "Q: Is card tokenization safe?",
                content:
                  "Absolutely! Card tokenization enhances security by replacing your actual card details with an encrypted token, reducing the risk of fraud.",
              },
            ],
          },
          {
            topic: "creditCard",
            content: [
              {
                id: 1,
                title: "Q: Can I use my credit card for payments on Trialshopy?",
                content:
                  "Yes, Trialshopy accepts all major credit cards for secure and convenient transactions.",
              },
              {
                id: 2,
                title: "Q: Is it safe to save my credit card details on Trialshopy?",
                content:
                  "Absolutely! We use advanced encryption and tokenization methods to protect your credit card information.",
              },
              {
                id: 3,
                title: "Q: What should I do if my credit card payment fails?",
                content:
                  "If your payment fails, please check your card details, ensure sufficient balance, or try a different payment method. You can also contact your bank for assistance.",
              },
              {
                id: 4,
                title: "Q: Does Trialshopy support EMI options on credit cards?",
                content:
                  "Yes, we offer EMI options on select credit cards. Check the payment page during checkout for available EMI plans.",
              },
              {
                id: 5,
                title: "Q: Can I remove my saved credit card details?",
                content:
                  "Yes, you can manage or delete your saved credit card details anytime from the payment settings in your Trialshopy account.",
              },
              {
                id: 6,
                title: "Q: How do I know if my credit card payment was successful?",
                content:
                  "You will receive an email and SMS confirmation from Trialshopy once your credit card payment is successfully processed.",
              },
            ],
          },
          {
            topic: "cashbackRecovery",
            content: [
              {
                id: 1,
                title: "Q: How do I check my cashback balance?",
                content:
                  "You can check your cashback balance in the 'My Rewards' or 'Wallet' section of your Trialshopy account.",
              },
              {
                id: 2,
                title: "Q: When will my cashback be credited?",
                content:
                  "Cashback is usually credited within 24-48 hours after a successful purchase. In some cases, it may take up to 7 days.",
              },
              {
                id: 3,
                title: "Q: What happens if I cancel or return an order that had cashback applied?",
                content:
                  "If you cancel or return an order, the cashback earned from that order will be deducted from your account.",
              },
              {
                id: 4,
                title: "Q: Can I transfer my cashback to my bank account?",
                content:
                  "Currently, cashback can only be used for future purchases on Trialshopy and cannot be transferred to a bank account.",
              },
              {
                id: 5,
                title: "Q: Why didn’t I receive cashback for my order?",
                content:
                  "Cashback may not be credited if the order was canceled, returned, or did not meet the eligibility criteria. Please check the offer terms or contact our support team.",
              },
              {
                id: 6,
                title: "Q: Does my cashback have an expiration date?",
                content:
                  "Yes, cashback may have an expiration date depending on the offer. You can check the validity in your 'My Rewards' section.",
              },
            ],
          },
          {
            topic: "fineJewellery",
            content: [
              {
                id: 1,
                title: "Q: Are the fine jewellery products authentic?",
                content:
                  "Yes, all our fine jewellery products are 100% authentic and come with proper certification for gold, diamonds, and other precious stones.",
              },
              {
                id: 2,
                title: "Q: Do you provide a warranty on fine jewellery?",
                content:
                  "Yes, we offer a warranty on our fine jewellery items. Warranty details vary by product and are mentioned in the product description.",
              },
              {
                id: 3,
                title: "Q: Can I return or exchange fine jewellery items?",
                content:
                  "Fine jewellery items can be returned or exchanged within the specified return period, provided they are unused and with all original packaging and certification.",
              },
              {
                id: 4,
                title: "Q: Do you offer customization or engraving services?",
                content:
                  "Yes, we offer customization and engraving services on select fine jewellery products. Contact our support team for more details.",
              },
              {
                id: 5,
                title: "Q: How do I take care of my fine jewellery?",
                content:
                  "To maintain your fine jewellery, avoid exposure to harsh chemicals, store it in a soft pouch, and clean it with a gentle jewellery cleaner or a soft cloth.",
              },
              {
                id: 6,
                title: "Q: What payment methods are available for fine jewellery purchases?",
                content:
                  "We accept all major credit/debit cards, net banking, EMI options, and wallet payments for fine jewellery purchases.",
              },
            ],
          },
          {
            topic: "openBoxDelivery",
            content: [
              {
                id: 1,
                title: "Q: What is Open Box Delivery?",
                content:
                  "Open Box Delivery allows customers to inspect the product before accepting the delivery. The delivery executive will open the package in front of you to ensure the correct product is delivered in proper condition.",
              },
              {
                id: 2,
                title: "Q: How does Open Box Delivery work?",
                content:
                  "When your order arrives, our delivery executive will open the package in your presence. You can verify the contents before accepting the order. If there are any issues, you can refuse to accept the delivery on the spot.",
              },
              {
                id: 3,
                title: "Q: What if the product is damaged or incorrect?",
                content:
                  "If you find the product to be damaged, defective, or incorrect during Open Box Delivery, you can reject it immediately, and we will initiate a replacement or refund as per our policy.",
              },
              {
                id: 4,
                title: "Q: Is Open Box Delivery available for all products?",
                content:
                  "Open Box Delivery is available for select high-value items or products prone to damage during transit. The option will be visible at checkout if applicable to your order.",
              },
              {
                id: 5,
                title: "Q: Is there an additional charge for Open Box Delivery?",
                content:
                  "No, Open Box Delivery is a complimentary service to ensure customer satisfaction and transparency in order fulfillment.",
              },
              {
                id: 6,
                title: "Q: Can I return the product after accepting an Open Box Delivery?",
                content:
                  "Once you accept the delivery after inspection, the standard return and exchange policy applies. Please review the return policy on our website for further details.",
              },
            ],
          },
  ]

  export default dataSet