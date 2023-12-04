export interface IUserInfo {
	mid: number;
	name: string;
	sex: string;
	face: string;
	sign: string;
	rank: number;
	level: number;
	jointime: number;
	moral: number;
	silence: number;
	email_status: number;
	tel_status: number;
	identification: number;
	vip: Vip;
	pendant: Pendant;
	nameplate: Nameplate;
	official: ExpertInfo;
	birthday: number;
	is_tourist: number;
	is_fake_account: number;
	pin_prompting: number;
	is_deleted: number;
	in_reg_audit: number;
	is_rip_user: boolean;
	profession: Profession;
	face_nft: number;
	face_nft_new: number;
	is_senior_member: number;
	honours: Honours;
	digital_id: string;
	digital_type: number;
	attestation: Attestation;
	expert_info: ExpertInfo;
	level_exp: LevelExp;
	coins: number;
	following: number;
	follower: number;
}

export interface Attestation {
	type: number;
	common_info: CommonInfo;
	splice_info: SpliceInfo;
	icon: string;
	desc: string;
}

export interface CommonInfo {
	title: string;
	prefix: string;
	prefix_title: string;
}

export interface SpliceInfo {
	title: string;
}

export interface ExpertInfo {
	title: string;
	state?: number;
	type: number;
	desc: string;
	role?: number;
}

export interface Honours {
	mid: number;
	colour: Colour;
	tags: null;
	is_latest_100honour: number;
}

export interface Colour {
	dark: string;
	normal: string;
}

export interface LevelExp {
	current_level: number;
	current_min: number;
	current_exp: number;
	next_exp: number;
	level_up: number;
}

export interface Nameplate {
	nid: number;
	name: string;
	image: string;
	image_small: string;
	level: string;
	condition: string;
}

export interface Pendant {
	pid: number;
	name: string;
	image: string;
	expire: number;
	image_enhance: string;
	image_enhance_frame: string;
	n_pid: number;
}

export interface Profession {
	id: number;
	name: string;
	show_name: string;
	is_show: number;
	category_one: string;
	realname: string;
	title: string;
	department: string;
	certificate_no: string;
	certificate_show: boolean;
}

export interface Vip {
	type: number;
	status: number;
	due_date: number;
	vip_pay_type: number;
	theme_type: number;
	label: Label;
	avatar_subscript: number;
	nickname_color: string;
	role: number;
	avatar_subscript_url: string;
	tv_vip_status: number;
	tv_vip_pay_type: number;
	tv_due_date: number;
}

export interface Label {
	path: string;
	text: string;
	label_theme: string;
	text_color: string;
	bg_style: number;
	bg_color: string;
	border_color: string;
	use_img_label: boolean;
	img_label_uri_hans: string;
	img_label_uri_hant: string;
	img_label_uri_hans_static: string;
	img_label_uri_hant_static: string;
}

export interface IGetRelationStatRes {
	dynamic_count: number;
	follower: number;
	following: number;
}
