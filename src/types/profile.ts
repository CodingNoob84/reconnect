type ApprovalStatus = "initial" | "pending" | "approved" | "rejected" | string;

export interface UserProfile {
  id: string;
  nickname: string | null;
  name: string;
  email: string;
  avatar: string;
  dob: string | null;
  department: string | null;
  regno: string | null;
  batch: string | null;
  phoneno: string | null;
  address: {
    line: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  } | null;
  current_position: string | null;
  industry: string | null;
  description: string | null;
  linkedin_link: string | null;
  x_link: string | null;
  facebook_link: string | null;
  instagram_link: string | null;
  created_at: string;
  updated_at: string;
  is_submitted: boolean;
  approval_status: ApprovalStatus;
  interests:string[]
}


export interface ActivityProfile {
  id: string
  name: string
  department: string
  avatar: string
  approval_status: string
  action_at: string
  action_by_profile: {
    id: string
    name: string
  } | null
}