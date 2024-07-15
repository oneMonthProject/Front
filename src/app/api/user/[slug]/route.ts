import { NextRequest, NextResponse } from "next/server";
import authApi from "@/app/api/_requestor/authApi";
import publicApi from "@/app/api/_requestor/publicApi";
import {routeResponseHandler} from "@/app/api/_requestor/routeResponseHandler";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { searchParams } = new URL(req.url);

  let res: Response;

  switch(params.slug){
    case 'simple':
      res = await authApi("/api/user/simple-me");
      break;
    case 'history':
      res = await authApi(`/api/user/me/project-history?pageNumber=${searchParams.get("pageNumber")}`);
      break;
    case 'trust-grade':
      res = await authApi("/api/trust-grade/me");
      break;
    case 'nickname':{
      res = await publicApi(`/api/user/check-nickname/${searchParams.get("nickname")}/public`);
      break;
    }
    case 'general':
      res = await authApi(`/api/user/${searchParams.get('userId')}`);
      break;
    default:
      throw new Error('Unknown User API');
  }

  return routeResponseHandler(req, res);
}

export async function DELETE(
    req: NextRequest,
  { params }: { params: { slug: string } }
) {
  let res: Response;
  if (params.slug === "profile-img") {
    res = await authApi("/api/user/me/profile-img", { method: "DELETE" });
  } else {
    throw Error("Unknown Api Route");
  }

  return routeResponseHandler(req, res);
}
