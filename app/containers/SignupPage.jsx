import React from "react";
import { Link } from "react-router";

export default class SignupPage extends React.Component {
	static getProps() {
		return {};
	}
	render() {
		return (
			<div className='vcentered'>
			  <form className='wide-form' id='real-account-form' method='post' novalidate=''>
			    <p>
			      <img className='form-logo'/>
			    </p>
			    <h3 inlineSyle='text-align: center'>Open Real Money Account</h3>
			    <p className='step1'>
			      <select id='mrms' name='mrms'>
			        <option value='Mr'>Mr</option>
			        <option value='Mrs'>Mrs</option>
			        <option value='Ms'>Ms</option>
			        <option value='Miss'>Miss</option>
			        <option value='Dr'>Dr</option>
			        <option value='Prof'>Prof</option>
			      </select>
			      <input id='fname' name='fname' placeholder='First name' type='text'/>
			      <input id='lname' name='lname' placeholder='Family name' type='text'/>
			    </p>
			    <p className='step1'>
			      <input id='email' name='Email' placeholder='Email' type='email'/>
			    </p>
			    <p className='step1'>
			      <label for='dobdd'>Date of birth</label>
			    </p>
			    <p className='step1'>
			      <span className='dob'>
			        <select id='dobdd' name='dobdd'>
			          <option value=''>Day</option>
			          <option value='1'>1</option>
			          <option value='2'>2</option>
			          <option value='3'>3</option>
			          <option value='4'>4</option>
			          <option value='5'>5</option>
			          <option value='6'>6</option>
			          <option value='7'>7</option>
			          <option value='8'>8</option>
			          <option value='9'>9</option>
			          <option value='10'>10</option>
			          <option value='11'>11</option>
			          <option value='12'>12</option>
			          <option value='13'>13</option>
			          <option value='14'>14</option>
			          <option value='15'>15</option>
			          <option value='16'>16</option>
			          <option value='17'>17</option>
			          <option value='18'>18</option>
			          <option value='19'>19</option>
			          <option value='20'>20</option>
			          <option value='21'>21</option>
			          <option value='22'>22</option>
			          <option value='23'>23</option>
			          <option value='24'>24</option>
			          <option value='25'>25</option>
			          <option value='26'>26</option>
			          <option value='27'>27</option>
			          <option value='28'>28</option>
			          <option value='29'>29</option>
			          <option value='30'>30</option>
			          <option value='31'>31</option>
			        </select>
			        <select id='dobmm' name='dobmm'>
			          <option value=''>Month</option>
			          <option value='01'>Jan</option>
			          <option value='02'>Feb</option>
			          <option value='03'>Mar</option>
			          <option value='04'>Apr</option>
			          <option value='05'>May</option>
			          <option value='06'>Jun</option>
			          <option value='07'>Jul</option>
			          <option value='08'>Aug</option>
			          <option value='09'>Sep</option>
			          <option value='10'>Oct</option>
			          <option value='11'>Nov</option>
			          <option value='12'>Dec</option>
			        </select>
			        <select id='dobyy' name='dobyy'>
			          <option value=''>Year</option>
			          <option value='1914'>1914</option>
			          <option value='1915'>1915</option>
			          <option value='1916'>1916</option>
			          <option value='1917'>1917</option>
			          <option value='1918'>1918</option>
			          <option value='1919'>1919</option>
			          <option value='1920'>1920</option>
			          <option value='1921'>1921</option>
			          <option value='1922'>1922</option>
			          <option value='1923'>1923</option>
			          <option value='1924'>1924</option>
			          <option value='1925'>1925</option>
			          <option value='1926'>1926</option>
			          <option value='1927'>1927</option>
			          <option value='1928'>1928</option>
			          <option value='1929'>1929</option>
			          <option value='1930'>1930</option>
			          <option value='1931'>1931</option>
			          <option value='1932'>1932</option>
			          <option value='1933'>1933</option>
			          <option value='1934'>1934</option>
			          <option value='1935'>1935</option>
			          <option value='1936'>1936</option>
			          <option value='1937'>1937</option>
			          <option value='1938'>1938</option>
			          <option value='1939'>1939</option>
			          <option value='1940'>1940</option>
			          <option value='1941'>1941</option>
			          <option value='1942'>1942</option>
			          <option value='1943'>1943</option>
			          <option value='1944'>1944</option>
			          <option value='1945'>1945</option>
			          <option value='1946'>1946</option>
			          <option value='1947'>1947</option>
			          <option value='1948'>1948</option>
			          <option value='1949'>1949</option>
			          <option value='1950'>1950</option>
			          <option value='1951'>1951</option>
			          <option value='1952'>1952</option>
			          <option value='1953'>1953</option>
			          <option value='1954'>1954</option>
			          <option value='1955'>1955</option>
			          <option value='1956'>1956</option>
			          <option value='1957'>1957</option>
			          <option value='1958'>1958</option>
			          <option value='1959'>1959</option>
			          <option value='1960'>1960</option>
			          <option value='1961'>1961</option>
			          <option value='1962'>1962</option>
			          <option value='1963'>1963</option>
			          <option value='1964'>1964</option>
			          <option value='1965'>1965</option>
			          <option value='1966'>1966</option>
			          <option value='1967'>1967</option>
			          <option value='1968'>1968</option>
			          <option value='1969'>1969</option>
			          <option value='1970'>1970</option>
			          <option value='1971'>1971</option>
			          <option value='1972'>1972</option>
			          <option value='1973'>1973</option>
			          <option value='1974'>1974</option>
			          <option value='1975'>1975</option>
			          <option value='1976'>1976</option>
			          <option value='1977'>1977</option>
			          <option value='1978'>1978</option>
			          <option value='1979'>1979</option>
			          <option value='1980'>1980</option>
			          <option value='1981'>1981</option>
			          <option value='1982'>1982</option>
			          <option value='1983'>1983</option>
			          <option value='1984'>1984</option>
			          <option value='1985'>1985</option>
			          <option value='1986'>1986</option>
			          <option value='1987'>1987</option>
			          <option value='1988'>1988</option>
			          <option value='1989'>1989</option>
			          <option value='1990'>1990</option>
			          <option value='1991'>1991</option>
			          <option value='1992'>1992</option>
			          <option value='1993'>1993</option>
			          <option value='1994'>1994</option>
			          <option value='1995'>1995</option>
			          <option value='1996'>1996</option>
			          <option value='1997'>1997</option>
			        </select>
			      </span>
			    </p>
			    <p className='step2'>
			      <label>Home Address</label>
			    </p>
			    <p className='step2'>
			      <select id='residence' name='residence'>
			        <option value=''>Country of Residence</option>
			        <option value='af'>Afghanistan</option>
			        <option value='ax'>Aland Islands</option>
			        <option value='al'>Albania</option>
			        <option value='dz'>Algeria</option>
			        <option value='as'>American Samoa</option>
			        <option value='ad'>Andorra</option>
			        <option value='ao'>Angola</option>
			        <option value='ai'>Anguilla</option>
			        <option value='aq'>Antarctica</option>
			        <option value='ag'>Antigua and Barbuda</option>
			        <option value='ar'>Argentina</option>
			        <option value='am'>Armenia</option>
			        <option value='aw'>Aruba</option>
			        <option value='au'>Australia</option>
			        <option value='at'>Austria</option>
			        <option value='az'>Azerbaijan</option>
			        <option disabled='' value='bs'>Bahamas</option>
			        <option value='bh'>Bahrain</option>
			        <option value='bd'>Bangladesh</option>
			        <option value='bb'>Barbados</option>
			        <option value='by'>Belarus</option>
			        <option value='be'>Belgium</option>
			        <option value='bz'>Belize</option>
			        <option value='bj'>Benin</option>
			        <option value='bm'>Bermuda</option>
			        <option value='bt'>Bhutan</option>
			        <option value='bo'>Bolivia</option>
			        <option value='ba'>Bosnia and Herzegovina</option>
			        <option value='bw'>Botswana</option>
			        <option value='bv'>Bouvet Island</option>
			        <option value='br'>Brazil</option>
			        <option value='io'>British Indian Ocean Terri...</option>
			        <option value='bn'>Brunei Darussalam</option>
			        <option value='bg'>Bulgaria</option>
			        <option value='bf'>Burkina Faso</option>
			        <option value='bi'>Burundi</option>
			        <option value='kh'>Cambodia</option>
			        <option value='cm'>Cameroon</option>
			        <option value='ca'>Canada</option>
			        <option value='cv'>Cape Verde</option>
			        <option value='ky'>Cayman Islands</option>
			        <option value='cf'>Central African Republic</option>
			        <option value='td'>Chad</option>
			        <option value='cl'>Chile</option>
			        <option value='cn'>China</option>
			        <option value='cx'>Christmas Island</option>
			        <option value='cc'>Cocos (Keeling) Islands</option>
			        <option value='co'>Colombia</option>
			        <option value='km'>Comoros</option>
			        <option value='cg'>Congo</option>
			        <option value='cd'>Congo, The Democratic Repu...</option>
			        <option value='ck'>Cook Islands</option>
			        <option disabled='' value='cr'>Costa Rica</option>
			        <option value='ci'>Cote D'Ivoire</option>
			        <option value='hr'>Croatia</option>
			        <option value='cu'>Cuba</option>
			        <option value='cy'>Cyprus</option>
			        <option value='cz'>Czech Republic</option>
			        <option value='dk'>Denmark</option>
			        <option value='dj'>Djibouti</option>
			        <option value='dm'>Dominica</option>
			        <option value='do'>Dominican Republic</option>
			        <option value='ec'>Ecuador</option>
			        <option value='eg'>Egypt</option>
			        <option value='sv'>El Salvador</option>
			        <option value='gq'>Equatorial Guinea</option>
			        <option value='er'>Eritrea</option>
			        <option value='ee'>Estonia</option>
			        <option value='et'>Ethiopia</option>
			        <option value='fk'>Falkland Islands (Malvinas...</option>
			        <option value='fo'>Faroe Islands</option>
			        <option value='fj'>Fiji</option>
			        <option value='fi'>Finland</option>
			        <option value='fr'>France</option>
			        <option value='gf'>French Guiana</option>
			        <option value='pf'>French Polynesia</option>
			        <option value='tf'>French Southern Territorie...</option>
			        <option value='ga'>Gabon</option>
			        <option value='gm'>Gambia</option>
			        <option value='ge'>Georgia</option>
			        <option value='de'>Germany</option>
			        <option value='gh'>Ghana</option>
			        <option value='gi'>Gibraltar</option>
			        <option value='gr'>Greece</option>
			        <option value='gl'>Greenland</option>
			        <option value='gd'>Grenada</option>
			        <option value='gp'>Guadeloupe</option>
			        <option value='gu'>Guam</option>
			        <option value='gt'>Guatemala</option>
			        <option disabled='' value='gg'>Guernsey</option>
			        <option value='gn'>Guinea</option>
			        <option value='gw'>Guinea-Bissau</option>
			        <option value='gy'>Guyana</option>
			        <option value='ht'>Haiti</option>
			        <option value='hm'>Heard Island and McDonald ...</option>
			        <option value='va'>Holy See (Vatican City Sta...</option>
			        <option value='hn'>Honduras</option>
			        <option disabled='' value='hk'>Hong Kong</option>
			        <option value='hu'>Hungary</option>
			        <option value='is'>Iceland</option>
			        <option value='in'>India</option>
			        <option value='id'>Indonesia</option>
			        <option disabled='' value='ir'>Iran, Islamic Republic of</option>
			        <option value='iq'>Iraq</option>
			        <option value='ie'>Ireland</option>
			        <option value='im'>Isle of Man</option>
			        <option value='il'>Israel</option>
			        <option value='it'>Italy</option>
			        <option value='jm'>Jamaica</option>
			        <option disabled='' value='jp'>Japan</option>
			        <option disabled='' value='je'>Jersey</option>
			        <option value='jo'>Jordan</option>
			        <option value='kz'>Kazakhstan</option>
			        <option value='ke'>Kenya</option>
			        <option value='ki'>Kiribati</option>
			        <option value='kp'>Korea, Democratic People's...</option>
			        <option value='kr'>Korea, Republic of</option>
			        <option value='kw'>Kuwait</option>
			        <option value='kg'>Kyrgyzstan</option>
			        <option value='la'>Lao People's Democratic Re...</option>
			        <option value='lv'>Latvia</option>
			        <option value='lb'>Lebanon</option>
			        <option value='ls'>Lesotho</option>
			        <option value='lr'>Liberia</option>
			        <option value='ly'>Libyan Arab Jamahiriya</option>
			        <option value='li'>Liechtenstein</option>
			        <option value='lt'>Lithuania</option>
			        <option value='lu'>Luxembourg</option>
			        <option value='mo'>Macao</option>
			        <option value='mk'>Macedonia</option>
			        <option value='mg'>Madagascar</option>
			        <option value='mw'>Malawi</option>
			        <option disabled='' value='my'>Malaysia</option>
			        <option value='mv'>Maldives</option>
			        <option value='ml'>Mali</option>
			        <option disabled='' value='mt'>Malta</option>
			        <option value='mh'>Marshall Islands</option>
			        <option value='mq'>Martinique</option>
			        <option value='mr'>Mauritania</option>
			        <option value='mu'>Mauritius</option>
			        <option value='yt'>Mayotte</option>
			        <option value='mx'>Mexico</option>
			        <option value='fm'>Micronesia, Federated Stat...</option>
			        <option value='md'>Moldova, Republic of</option>
			        <option value='mc'>Monaco</option>
			        <option value='mn'>Mongolia</option>
			        <option value='me'>Montenegro</option>
			        <option value='ms'>Montserrat</option>
			        <option value='ma'>Morocco</option>
			        <option value='mz'>Mozambique</option>
			        <option value='mm'>Myanmar</option>
			        <option value='na'>Namibia</option>
			        <option value='nr'>Nauru</option>
			        <option value='np'>Nepal</option>
			        <option value='nl'>Netherlands</option>
			        <option value='an'>Netherlands Antilles</option>
			        <option value='nc'>New Caledonia</option>
			        <option value='nz'>New Zealand</option>
			        <option value='ni'>Nicaragua</option>
			        <option value='ne'>Niger</option>
			        <option value='ng'>Nigeria</option>
			        <option value='nu'>Niue</option>
			        <option value='nf'>Norfolk Island</option>
			        <option value='mp'>Northern Mariana Islands</option>
			        <option value='no'>Norway</option>
			        <option value='om'>Oman</option>
			        <option value='pk'>Pakistan</option>
			        <option value='pw'>Palau</option>
			        <option value='ps'>Palestinian Territory, Occ...</option>
			        <option value='pa'>Panama</option>
			        <option value='pg'>Papua New Guinea</option>
			        <option value='py'>Paraguay</option>
			        <option value='pe'>Peru</option>
			        <option value='ph'>Philippines</option>
			        <option value='pn'>Pitcairn</option>
			        <option value='pl'>Poland</option>
			        <option value='pt'>Portugal</option>
			        <option value='pr'>Puerto Rico</option>
			        <option value='qa'>Qatar</option>
			        <option value='re'>Reunion</option>
			        <option value='ro'>Romania</option>
			        <option value='ru'>Russian Federation</option>
			        <option value='rw'>Rwanda</option>
			        <option value='sh'>Saint Helena</option>
			        <option value='kn'>Saint Kitts and Nevis</option>
			        <option value='lc'>Saint Lucia</option>
			        <option value='pm'>Saint Pierre and Miquelon</option>
			        <option value='vc'>Saint Vincent and the Gren...</option>
			        <option value='bl'>Saint-Barthélemy</option>
			        <option value='mf'>Saint-Martin (French part)</option>
			        <option value='ws'>Samoa</option>
			        <option value='sm'>San Marino</option>
			        <option value='st'>Sao Tome and Principe</option>
			        <option value='sa'>Saudi Arabia</option>
			        <option value='sn'>Senegal</option>
			        <option value='rs'>Serbia</option>
			        <option value='sc'>Seychelles</option>
			        <option value='sl'>Sierra Leone</option>
			        <option value='sg'>Singapore</option>
			        <option value='sk'>Slovakia</option>
			        <option value='si'>Slovenia</option>
			        <option value='sb'>Solomon Islands</option>
			        <option value='so'>Somalia</option>
			        <option value='za'>South Africa</option>
			        <option value='gs'>South Georgia and the Sout...</option>
			        <option value='es'>Spain</option>
			        <option value='lk'>Sri Lanka</option>
			        <option value='sd'>Sudan</option>
			        <option value='sr'>Suriname</option>
			        <option value='sj'>Svalbard and Jan Mayen</option>
			        <option value='sz'>Swaziland</option>
			        <option value='se'>Sweden</option>
			        <option value='ch'>Switzerland</option>
			        <option value='sy'>Syrian Arab Republic</option>
			        <option value='tw'>Taiwan, Province of China</option>
			        <option value='tj'>Tajikistan</option>
			        <option value='tz'>Tanzania, United Republic ...</option>
			        <option value='th'>Thailand</option>
			        <option value='tl'>Timor-Leste</option>
			        <option value='tg'>Togo</option>
			        <option value='tk'>Tokelau</option>
			        <option value='to'>Tonga</option>
			        <option value='tt'>Trinidad and Tobago</option>
			        <option value='tn'>Tunisia</option>
			        <option value='tr'>Turkey</option>
			        <option value='tm'>Turkmenistan</option>
			        <option value='tc'>Turks and Caicos Islands</option>
			        <option value='tv'>Tuvalu</option>
			        <option value='ug'>Uganda</option>
			        <option value='ua'>Ukraine</option>
			        <option value='ae'>United Arab Emirates</option>
			        <option value='gb'>United Kingdom</option>
			        <option disabled='' value='us'>United States</option>
			        <option disabled='' value='um'>United States Minor Outlyi...</option>
			        <option value='uy'>Uruguay</option>
			        <option value='uz'>Uzbekistan</option>
			        <option value='vu'>Vanuatu</option>
			        <option value='ve'>Venezuela</option>
			        <option value='vn'>Vietnam</option>
			        <option value='vg'>Virgin Islands, British</option>
			        <option disabled='' value='vi'>Virgin Islands, U.S.</option>
			        <option value='wf'>Wallis and Futuna</option>
			        <option value='eh'>Western Sahara</option>
			        <option value='ye'>Yemen</option>
			        <option value='zm'>Zambia</option>
			        <option value='zw'>Zimbabwe</option>
			      </select>
			      <select id='AddressState' name='AddressState'>
			        <option value=''>State/Province</option>
			        <option value='Some'>Some</option>
			      </select>
			    </p>
			    <p className='step2'>
			      <input id='AddressTown' name='AddressTown' placeholder='Town/City' type='text'/>
			      <input id='AddressPostcode' name='AddressPostcode' placeholder='Postal Code / ZIP' type='text'/>
			    </p>
			    <p className='step2'>
			      <input id='Address1' name='Address1' placeholder='First line' type='text'/>
			    </p>
			    <p className='step2'>
			      <input id='Address2' name='Address2' placeholder='Second line' type='text'/>
			    </p>
			    <p className='step2'>
			      <input id='Tel' name='Tel' placeholder='Telephone' type='tel'/>
			    </p>
			    <p className='step3'>
			      <label>Security</label>
			    </p>
			    <p className='step3'>
			      <input name='chooseapassword' placeholder='Password' type='password'/>
			    </p>
			    <p className='step3'>
			      <select id='secretquestion' name='secretquestion'>
			        <option value=''>Secret question</option>
			        <option value="Mother's maiden name">Mother's maiden name</option>
			        <option value='Name of your pet'>Name of your pet</option>
			        <option value='Name of first love'>Name of first love</option>
			        <option value='Memorable town/city'>Memorable town/city</option>
			        <option value='Memorable date'>Memorable date</option>
			        <option value='Favourite dish'>Favourite dish</option>
			        <option value='Brand of first car'>Brand of first car</option>
			        <option value='Favourite artist'>Favourite artist</option>
			      </select>
			      <input name='secretanswer' placeholder='Answer to secret question' type='text'/>
			    </p>
			    <p class='step3'>
			      <label>
			        <input id='tnc' name='tnc' type='checkbox'/>
			          I have read and agree to the <a href='https://www.binary.com/c/c_template.cgi?filecode=legal&amp;amp;l=EN' target='_blank'>terms and conditions</a> of the site.
			      </label>
			    </p>
			    <p>
			      <button class='important' id='open-real-acount' value='Open Account'>Open Account</button>
			    </p>
			  </form>

			</div>
		)
	}
}
