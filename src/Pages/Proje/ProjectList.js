import React, { Component } from 'react';
import services from '../library/RestService'
import UserServices from '../library/UserServices'
import { Button, Form, Col, Row ,Table} from 'react-bootstrap';
import interceptor from "../library/interceptor";

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            responseData: [],
            commonData: [],
            selectedNewsTypeValue:null
        };
       
        this.handleFindNewsSubmit = this.handleFindNewsSubmit.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    componentDidMount() {
        this.getProject();

    }

    handleStatusChange(event) {
        this.setState({ selectedNewsTypeValue:event.target.value });
    }

    handleFindNewsSubmit(event) {
        
        services.getCommonData(UserServices.getDepoId(),this.state.selectedNewsTypeValue)
            .then(response => {
                console.log(response.data);
                this.setState({ commonData: response.data });
                       }).catch(error => {
                        this.setState({ commonData: [] });
            });
        
    }

    getProject() {

        services.getProject(UserServices.getDepoId())
            .then(response => {
                this.setState({ responseData: response.data });
                       }).catch(error => {
                        this.setState({ responseData:UserServices.getProjectList() });
                        console.log(error);
                        console.log("BURDAYIM");

            });

    }


    render() {
        const {  selectedNewsTypeValue ,responseData} = this.state;

        let optionTemplate = responseData.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
          ));
            
          
        return (
                <div>
                    <Row className="news-select-row">
                        <Col>
                            <Form>

                            <div class="form-row">
                                 <div class="form-group col-md-1">
                                     <label for="inputEmail4">Proje Seçimi</label>
                                  </div>   
                                  <div class="form-group col-md-2">
                                     <select className="form-control" 
                                        value={selectedNewsTypeValue|| ''} onChange={this.handleStatusChange} >
                                        <option value=''>Hepsi</option>
                                         {optionTemplate}
                                         </select>
                                 </div> 
                            
                                  <div class="form-group col-md-2">
                                  < Button onClick={this.handleFindNewsSubmit} className="btn btn-success" >Search</Button>
                                 </div>
                                 </div>

                            
                                <div className="row top-buffer">
                            <Table className="table table-bordered table-hover table-borderless">
                                <thead>
                                    <tr key="1213123123" >
                                        <th>Spool No</th>
                                        <th> Stok Kodu</th>
                                        <th> Stok Adı</th>
                                        <th>Stok Birim</th>
                                        <th>Miktar</th>
                                        <th>Ağırlık Birim</th>
                                        <th>Sabit Ağırlık</th>
                                        <th> Ağırlık Miktarı</th>
                                        <th>Proje Adı</th>
                                        <th>Depo Adı</th>
                                        <th>İşlem Durumu</th>
                                        <th>Spoll Barkod No</th>
                                    </tr>
                                </thead>
                                <tbody>

                                {this.state.commonData && 

this.state.commonData.map(member =>
    <tr  key={member.id}  className={member.rowColor}>
        <td>{member.spoolNo} </td>
        <td>{member.stokKodu}</td>
        <td>{member.stokAdi}</td> 
        <td>{member.stokBirim} </td>
        <td>{member.miktar}</td>
        <td>{member.stokAgirlikBirim}</td>
        <td>{member.sabitAgirlik} </td>
        <td>{member.agirlikMiktari}</td>
        <td>{member.projeAdi}</td>
        <td>{member.depoAdi} </td>
        <td>{member.islem} </td>
        <td>{member.spoolBarkodNo}</td>
    </tr>)

}

                                </tbody>
                            </Table>
                            </div>
                            </Form>
                        </Col>
                    </Row>
  
                </div>
        );
    }
}
