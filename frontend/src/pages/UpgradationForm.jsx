import { Footer } from "../components/Footer";
import { InnerAppbar } from "../components/InnerAppbar";
import { Sidebar } from "../components/Sidebar";
import { useNavigate } from "react-router-dom";
import { UserDetails } from "../components/UserDetails";

export const UpgradationForm = () => {

    const [user,setUser] = useState([]);
    const postOptions = ["Post 1", "Post 2", "Post 3", "Post 4", "Post 5"];
  const quantityOptions = ["1", "2", "3", "4", "5"];

    useEffect( () => {
        const token = localStorage.getItem("token");
    
        axios.get("http://localhost:3000/api/v1/user/details",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
    
        .then(response => {
          console.log("Response data: ", response.data);
          setUser(response.data.user);
        })
      },[])
  
  
  
  return (
    <div>
      <InnerAppbar />

      <div className="flex w-full">
        <div className="w-1/5">
      <Sidebar />
        </div>

      <div className="w-4/5 flex justify-between ">
      <div>
        <strong>
            Your Current Details are:
        </strong>
        <div>
            <div>{user.firstName} {user.lastName}</div>
            <div>{user.position}</div>
            <div>{user.positionseniorityindex}</div>
        </div>
        <div>
        <form>
      <div>
        <label>
          Select Post:
          <select value={postType} onChange={(e) => setPostType(e.target.value)}>
            <option value="" disabled>Select a post</option>
            {postOptions.map((post, index) => (
              <option key={index} value={post}>{post}</option>
            ))}
          </select>
        </label>
        {errors.postType && <p>{errors.postType._errors[0]}</p>}
      </div>

      <div>
        <label>
          Select Quantity:
          <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
            <option value="" disabled>Select a quantity</option>
            {quantityOptions.map((quantity, index) => (
              <option key={index} value={quantity}>{quantity}</option>
            ))}
          </select>
        </label>
        {errors.quantity && <p>{errors.quantity._errors[0]}</p>}
      </div>

      <div>
        <label>
          Message:
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
        </label>
        {errors.message && <p>{errors.message._errors[0]}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
        </div>
      </div>
      </div>
      </div>

      <Footer />
      
    </div>
  );
};


