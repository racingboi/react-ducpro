import React, { useEffect, useState } from 'react'
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import EditCv from '../../Component/Modal/EditCv';
export default function Cv() {
  const [name, setName] = useState("");
  const [mssv, setMssv] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = React.useState("");

  useEffect(() => {
    const usersData = localStorage.getItem('users');

    if (usersData) {
      const parsedusersData = JSON.parse(usersData);
      setName(parsedusersData.name);
      setMssv(parsedusersData.mssv);
      setPhone(parsedusersData.phone);
      setAddress(parsedusersData.address);
    }
  }, []);
  const onUpdateusers = (updatedusers) => {
    // Cập nhật thông tin người dùng khi được gọi từ ModalDuc
    setName(updatedusers.name);
    setMssv(updatedusers.mssv);
    setPhone(updatedusers.phone);
    setPhone(updatedusers.address);

  };
  return (
    <div id="print-section" className='py-5'>
      <div className="container">
        <div className="team-single">
          <div className="row">
            <div className="col-lg-4 col-md-5 xs-margin-30px-bottom">
              <div className="team-single-img">
                <img className='w-100' src="https://scontent.fbmv1-1.fna.fbcdn.net/v/t39.30808-1/271687508_448485783593541_8314626224747176482_n.jpg?stp=dst-jpg_p240x240&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=XWBJXAzl72cAX-I6aoK&_nc_ht=scontent.fbmv1-1.fna&oh=00_AfDhOUh2okBLQ_cAtRrnaU1jgN_6D5lyhm2xAVUcbbLPbQ&oe=65F06A9A" alt="" />
              </div>
              <div className="bg-light-gray padding-30px-all md-padding-25px-all sm-padding-20px-all text-center">
                <h4 className="margin-10px-bottom font-size24 md-font-size22 sm-font-size20 font-weight-600">{name}</h4>
                <p className="sm-width-95 sm-margin-auto">{mssv}</p>
                <div className="margin-20px-top team-single-icons">
                  <EditCv onUpdateusers={onUpdateusers} />

                </div>
              </div>
            </div>

            <div className="col-lg-8 col-md-7">
              <div className="team-single-text padding-50px-left sm-no-padding-left">
                <h4 className="font-size38 sm-font-size32 xs-font-size30">Profile</h4>
                <p className="no-margin-bottom">Là sinh viên năm thứ hai tại Trường FPT, đã nhanh chóng gây ấn tượng với giáo viên và bạn bè của mình bằng niềm đam mê và sự nỗ lực không ngừng trong lĩnh vực lập trình web. Với kiến thức vững chắc về HTML, CSS, và JavaScript, cùng với sự quan tâm sâu sắc đối với các framework phía front-end như React, em đã tạo ra nhiều ứng dụng web đẹp mắt và chức năng. em cũng dành thời gian để tìm hiểu sâu hơn về back-end, với mong muốn trở thành một full-stack developer toàn diện. Dù mới chỉ ở giai đoạn đầu của hành trình, em đã thể hiện sự chăm chỉ, sẵn sàng học hỏi và khả năng giải quyết vấn đề một cách sáng tạo. Sự tận tâm và khả năng làm việc nhóm không chỉ giúp anh đạt được thành tích học tập xuất sắc mà còn là nguồn cảm hứng cho nhiều bạn bè và người xung quanh.</p>
                <div className="contact-info-section margin-40px-tb">
                  <ul className="list-style9 no-margin">
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-graduation-cap text-orange"></i>
                          <strong className="margin-10px-left text-orange">Degree:</strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>Student</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="far fa-gem text-yellow"></i>
                          <strong className="margin-10px-left text-yellow">Exp.:</strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>Studying</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="far fa-file text-lightred"></i>
                          <strong className="margin-10px-left text-lightred">Courses:</strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>Web programming</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-map-marker-alt text-green"></i>
                          <strong className="margin-10px-left text-green">Address:</strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>{address}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-mobile-alt text-purple"></i>
                          <strong className="margin-10px-left xs-margin-four-left text-purple">Phone:</strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p>{phone}</p>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="row">
                        <div className="col-md-5 col-5">
                          <i className="fas fa-envelope text-pink"></i>
                          <strong className="margin-10px-left xs-margin-four-left text-pink">Email:</strong>
                        </div>
                        <div className="col-md-7 col-7">
                          <p><a href="mailto:truongcongduc2004@gmail.com">truongcongduc2004@gmail.com</a></p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <h5 className="font-size24 sm-font-size22 xs-font-size20">Kỹ năng chuyên nghiệp</h5>
                <div className="sm-no-margin">
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">HTML-CSS</div>
                      <div className="col-5 text-right">10%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}
                      className="animated custom-bar progress-bar slideInLeft bg-sky"></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">JS</div>
                      <div className="col-5 text-right">10%</div>
                    </div>

                  </div>
                  <div className="custom-progress progress">
                    <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}
                      className="animated custom-bar progress-bar slideInLeft bg-orange"></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">PHP</div>
                      <div className="col-5 text-right">10%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}
                      className="animated custom-bar progress-bar slideInLeft bg-green"></div>
                  </div>
                  <div className="progress-text">
                    <div className="row">
                      <div className="col-7">LARAVEL</div>
                      <div className="col-5 text-right">10%</div>
                    </div>
                  </div>
                  <div className="custom-progress progress">
                    <div role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style={{ width: '10%' }}
                      className="animated custom-bar progress-bar slideInLeft bg-yellow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
