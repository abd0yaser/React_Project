import React from 'react'
import "../css/footer.css"

export function MyFooter() {
  return (
    <footer className="footer-container footer">
      <div className="bg-gray footer1 text-white">
        <div className="container ">
          <div className="row">
            <div className="col-lg-3 col-sm-6 py-4 text-center">
              <h6 className="text-sm mb-1">Free shipping &amp; return</h6>
              <p className="text-muted text-sm ">Free Shipping over $300</p>
            </div>
            <div className="col-lg-3 col-sm-6 py-4 text-center ">
              <h6 className="text-sm mb-1">Money back guarantee</h6>
              <p className="text-muted text-sm ">30 Days Money Back Guarantee</p>
            </div>
            <div className="col-lg-3 col-sm-6 py-4 text-center">
              <h6 className="text-sm mb-1">Best prices</h6>
              <p className="text-muted text-sm ">Always the best prices</p>
            </div>
            <div className="col-lg-3 col-sm-6 py-4 text-center" >
              <h6 className="text-sm mb-1">020-800-456-747</h6>
              <p className="text-muted text-sm ">24/7 Available Support</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-4 fw-light footer2 text-white">
        <div className="container">
          <div className="row align-items-center text-sm text-gray-500">
            <div className="col-lg-4 text-center text-lg-start">
              <p className="mb-lg-0">© 2022, Your company.  All rights reserved.</p>
            </div>
            <div className="col-lg-8">
              <ul className="list-inline mb-0 mt-2 mt-md-0 text-center text-lg-end">
                <li className="list-inline-item"> <a className="text-reset text-decoration-none px-2" href="#">Terms &amp; Conditions </a></li>
                <li className="list-inline-item"> <a className="text-reset text-decoration-none px-2" href="#">Privacy &amp; cookies </a></li>
                <li className="list-inline-item"> <a className="text-reset text-decoration-none px-2" href="#">Accessibility </a></li>
                <li className="list-inline-item"> <a className="text-reset text-decoration-none px-2" href="#">Customer Data Promise </a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </footer>
  )
}
