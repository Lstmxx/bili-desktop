export interface IGetRecommendVideos {
	/**
	 * 数量
	 */
	ps: number;
	/**
	 * 已显示的video list
	 */
	last_showlist?: string;
}

export interface IGetRecommendVideosRes {
	item: Video[];
}

export interface Video {
	id: number;
	bvid: string;
	cid: number;
	goto: string;
	uri: string;
	pic: string;
	pic_4_3: string;
	title: string;
	duration: number;
	pubdate: number;
	owner: Owner;
	stat: Stat;
	av_feature: any;
	is_followed: number;
	rcmd_reason: RcmdReason;
	show_info: number;
	track_id: string;
	pos: number;
	room_info: any;
	ogv_info: any;
	business_info: any;
	is_stock: number;
	enable_vt: number;
	vt_display: string;
}

export interface Owner {
	mid: number;
	name: string;
	face: string;
}

export interface RcmdReason {
	reason_type: number;
}

export interface Stat {
	view: number;
	like: number;
	danmaku: number;
	vt: number;
}
