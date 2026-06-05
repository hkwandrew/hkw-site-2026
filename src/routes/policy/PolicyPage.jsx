import { Link } from 'react-router'
import usePageActive from '@/shared/hooks/usePageActive'
import {
  Document,
  Intro,
  Page,
  PolicySection,
  SectionTitle,
  Title,
} from './PolicyPage.styles'

const PolicyPage = () => {
  const isActive = usePageActive()

  return (
    <Page $isActive={isActive} data-testid='policy-page'>
      <Document aria-labelledby='policy-title'>
        <Title id='policy-title'>HKW Policies</Title>

        <PolicySection aria-labelledby='fulfillment-policy-title'>
          <SectionTitle id='fulfillment-policy-title'>
            Fulfillment Policy
          </SectionTitle>
          <Intro>
            At <strong>HKW.io</strong>, we specialize in delivering high-quality
            website solutions tailored to your needs. To ensure a seamless
            experience, our fulfillment process is outlined below:
          </Intro>
          <ol>
            <li>
              <strong>Project Confirmation:</strong>
              <ul>
                <li>
                  Once you confirm your Scope of Work and 50% deposit payment is
                  processed, you will receive a project confirmation email. This
                  email will include:
                  <ul>
                    <li>Your order details.</li>
                    <li>Estimated timelines for project commencement.</li>
                    <li>
                      Contact information for your assigned project manager.
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong>Project Fulfillment:</strong>
              <ul>
                <li>
                  Our team will begin work on your website project within{' '}
                  <strong>2 business days</strong> of order confirmation.
                </li>
                <li>
                  Timelines for project delivery vary depending on the scope of
                  work. Your assigned project manager will provide:
                  <ul>
                    <li>A detailed project timeline.</li>
                    <li>Regular updates on progress.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong>Completion and Delivery:</strong>
              <ul>
                <li>
                  Upon completing your website project, we will:
                  <ul>
                    <li>Provide a final review link for your approval.</li>
                    <li>
                      Make any necessary adjustments based on agreed-upon
                      revisions.
                    </li>
                    <li>
                      Deliver the final website files or launch your website,
                      depending on the service package.
                    </li>
                    <li>Bill for the final 50% of project fees.</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <strong>Post-Delivery Support:</strong>
              <ul>
                <li>
                  After the project is delivered, our team will provide{' '}
                  <strong>7 days of technical support</strong> to ensure
                  everything functions smoothly.
                </li>
                <li>
                  If you require additional support, maintenance packages are
                  available for purchase.
                </li>
              </ul>
            </li>
          </ol>
        </PolicySection>

        <PolicySection aria-labelledby='payment-policy-title'>
          <SectionTitle id='payment-policy-title'>Payment Policy</SectionTitle>
          <ul>
            <li>
              <strong>50% Payment Upfront:</strong>
              <ul>
                <li>
                  All services provided by <strong>HKW.io</strong> require a 50%
                  deposit at the time of purchase.
                </li>
                <li>
                  We accept payments securely via Stripe, ACH, or by mail.
                </li>
              </ul>
            </li>
            <li>
              <strong>No Refund Policy:</strong>
              <ul>
                <li>
                  Due to the nature of our services, all payments are{' '}
                  <strong>non-refundable</strong> once the order is confirmed
                  and work has commenced.
                </li>
                <li>
                  If you have any concerns regarding the service provided,
                  please contact us at{' '}
                  <a href='mailto:support@hkw.io'>support@hkw.io</a>, and we
                  will work to address your concerns.
                </li>
              </ul>
            </li>
          </ul>
        </PolicySection>

        <PolicySection aria-labelledby='delivery-timelines-title'>
          <SectionTitle id='delivery-timelines-title'>
            Delivery Timelines
          </SectionTitle>
          <p>
            We are committed to delivering high-quality work on time. While
            specific delivery timelines depend on the scope of your project,
            general timelines are as follows:
          </p>
          <ul>
            <li>
              <strong>Website Projects:</strong> Delivery within{' '}
              <strong>4-16 weeks</strong> from the start date, depending on
              complexity.
            </li>
            <li>
              <strong>Custom Features or Add-ons:</strong> Timelines for custom
              work will be provided during the planning phase.
            </li>
          </ul>
          <p>
            If there are any delays due to unforeseen circumstances, we will
            notify you immediately and provide an updated delivery schedule.
          </p>
        </PolicySection>

        <PolicySection aria-labelledby='contact-information-title'>
          <SectionTitle id='contact-information-title'>
            Contact Information
          </SectionTitle>
          <p>
            If you have questions regarding our fulfillment policy, please
            contact us:
          </p>
          <ul>
            <li>
              <strong>Email:</strong>{' '}
              <a href='mailto:support@hkw.io'>support@hkw.io</a>
            </li>
            <li>
              <strong>Business Hours:</strong> Monday to Friday, 9:00 AM - 5:00
              PM PT
            </li>
          </ul>
          <p>
            Thank you for choosing <strong>HKW.io</strong>. We look forward to
            building something exceptional with you.
          </p>
        </PolicySection>
      </Document>
    </Page>
  )
}

export default PolicyPage
