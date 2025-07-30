--
-- PostgreSQL database dump
--

-- Dumped from database version 17.4
-- Dumped by pg_dump version 17.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public.users_usuariologro DROP CONSTRAINT users_usuariologro_usuario_id_5d47101e_fk_users_usuario_id;
ALTER TABLE ONLY public.users_usuariologro DROP CONSTRAINT users_usuariologro_logro_id_8f013a09_fk_users_logro_id;
ALTER TABLE ONLY public.users_usuario_user_permissions DROP CONSTRAINT users_usuario_user_p_usuario_id_75526fda_fk_users_usu;
ALTER TABLE ONLY public.users_usuario_user_permissions DROP CONSTRAINT users_usuario_user_p_permission_id_bf5f5453_fk_auth_perm;
ALTER TABLE ONLY public.users_usuario DROP CONSTRAINT users_usuario_rol_id_9bc301ef_fk_users_rol_id;
ALTER TABLE ONLY public.users_usuario_groups DROP CONSTRAINT users_usuario_groups_usuario_id_3a8a9a06_fk_users_usuario_id;
ALTER TABLE ONLY public.users_usuario_groups DROP CONSTRAINT users_usuario_groups_group_id_9d969afd_fk_auth_group_id;
ALTER TABLE ONLY public.users_perfil DROP CONSTRAINT users_perfil_usuario_id_6ba4465b_fk_users_usuario_id;
ALTER TABLE ONLY public.rewards_recompensa DROP CONSTRAINT rewards_recompensa_nivel_id_e3a803b8_fk_lessons_nivel_id;
ALTER TABLE ONLY public.rewards_progreso DROP CONSTRAINT rewards_progreso_usuario_id_1741dc68_fk_users_usuario_id;
ALTER TABLE ONLY public.rewards_progreso DROP CONSTRAINT rewards_progreso_nivel_id_afa3f001_fk_lessons_nivel_id;
ALTER TABLE ONLY public.lessons_nivel DROP CONSTRAINT lessons_nivel_mundo_id_aa2f884e_fk_lessons_mundo_id;
ALTER TABLE ONLY public.lessons_materialdidactico_niveles DROP CONSTRAINT lessons_materialdida_nivel_id_edc6a3ff_fk_lessons_n;
ALTER TABLE ONLY public.lessons_materialdidactico_niveles DROP CONSTRAINT lessons_materialdida_materialdidactico_id_b9fbff00_fk_lessons_m;
ALTER TABLE ONLY public.lessons_materialdidactico DROP CONSTRAINT lessons_materialdida_categoria_id_985ecd4a_fk_lessons_c;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_usuario_id;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm;
DROP INDEX public.users_usuariologro_usuario_id_5d47101e;
DROP INDEX public.users_usuariologro_logro_id_8f013a09;
DROP INDEX public.users_usuario_username_399a0cac_like;
DROP INDEX public.users_usuario_user_permissions_usuario_id_75526fda;
DROP INDEX public.users_usuario_user_permissions_permission_id_bf5f5453;
DROP INDEX public.users_usuario_rol_id_9bc301ef;
DROP INDEX public.users_usuario_groups_usuario_id_3a8a9a06;
DROP INDEX public.users_usuario_groups_group_id_9d969afd;
DROP INDEX public.users_usuario_email_b77ec988_like;
DROP INDEX public.rewards_recompensa_nivel_id_e3a803b8;
DROP INDEX public.rewards_progreso_usuario_id_1741dc68;
DROP INDEX public.rewards_progreso_nivel_id_afa3f001;
DROP INDEX public.lessons_nivel_mundo_id_aa2f884e;
DROP INDEX public.lessons_materialdidactico_niveles_nivel_id_edc6a3ff;
DROP INDEX public.lessons_materialdidactico_niveles_materialdidactico_id_b9fbff00;
DROP INDEX public.lessons_materialdidactico_categoria_id_985ecd4a;
DROP INDEX public.django_session_session_key_c0390e0f_like;
DROP INDEX public.django_session_expire_date_a5c62663;
DROP INDEX public.django_admin_log_user_id_c564eba6;
DROP INDEX public.django_admin_log_content_type_id_c4bce8eb;
DROP INDEX public.auth_permission_content_type_id_2f476e4b;
DROP INDEX public.auth_group_permissions_permission_id_84c5c92e;
DROP INDEX public.auth_group_permissions_group_id_b120cbf9;
DROP INDEX public.auth_group_name_a6ea08ec_like;
ALTER TABLE ONLY public.users_usuariologro DROP CONSTRAINT users_usuariologro_usuario_id_logro_id_c9124d3c_uniq;
ALTER TABLE ONLY public.users_usuariologro DROP CONSTRAINT users_usuariologro_pkey;
ALTER TABLE ONLY public.users_usuario DROP CONSTRAINT users_usuario_username_key;
ALTER TABLE ONLY public.users_usuario_user_permissions DROP CONSTRAINT users_usuario_user_permissions_pkey;
ALTER TABLE ONLY public.users_usuario_user_permissions DROP CONSTRAINT users_usuario_user_permi_usuario_id_permission_id_9b373975_uniq;
ALTER TABLE ONLY public.users_usuario DROP CONSTRAINT users_usuario_pkey;
ALTER TABLE ONLY public.users_usuario_groups DROP CONSTRAINT users_usuario_groups_usuario_id_group_id_db69fe93_uniq;
ALTER TABLE ONLY public.users_usuario_groups DROP CONSTRAINT users_usuario_groups_pkey;
ALTER TABLE ONLY public.users_usuario DROP CONSTRAINT users_usuario_email_b77ec988_uniq;
ALTER TABLE ONLY public.users_rol DROP CONSTRAINT users_rol_pkey;
ALTER TABLE ONLY public.users_perfil DROP CONSTRAINT users_perfil_pkey;
ALTER TABLE ONLY public.users_logro DROP CONSTRAINT users_logro_pkey;
ALTER TABLE ONLY public.rewards_recompensa DROP CONSTRAINT rewards_recompensa_pkey;
ALTER TABLE ONLY public.rewards_progreso DROP CONSTRAINT rewards_progreso_pkey;
ALTER TABLE ONLY public.lessons_nivel DROP CONSTRAINT lessons_nivel_pkey;
ALTER TABLE ONLY public.lessons_mundo DROP CONSTRAINT lessons_mundo_pkey;
ALTER TABLE ONLY public.lessons_materialdidactico DROP CONSTRAINT lessons_materialdidactico_pkey;
ALTER TABLE ONLY public.lessons_materialdidactico_niveles DROP CONSTRAINT lessons_materialdidactico_niveles_pkey;
ALTER TABLE ONLY public.lessons_materialdidactico_niveles DROP CONSTRAINT lessons_materialdidactic_materialdidactico_id_niv_2da0ba17_uniq;
ALTER TABLE ONLY public.lessons_categoria DROP CONSTRAINT lessons_categoria_pkey;
ALTER TABLE ONLY public.django_session DROP CONSTRAINT django_session_pkey;
ALTER TABLE ONLY public.django_migrations DROP CONSTRAINT django_migrations_pkey;
ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_pkey;
ALTER TABLE ONLY public.django_content_type DROP CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq;
ALTER TABLE ONLY public.django_admin_log DROP CONSTRAINT django_admin_log_pkey;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_pkey;
ALTER TABLE ONLY public.auth_permission DROP CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq;
ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_pkey;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_pkey;
ALTER TABLE ONLY public.auth_group_permissions DROP CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq;
ALTER TABLE ONLY public.auth_group DROP CONSTRAINT auth_group_name_key;
DROP TABLE public.users_usuariologro;
DROP TABLE public.users_usuario_user_permissions;
DROP TABLE public.users_usuario_groups;
DROP TABLE public.users_usuario;
DROP TABLE public.users_rol;
DROP TABLE public.users_perfil;
DROP TABLE public.users_logro;
DROP TABLE public.rewards_recompensa;
DROP TABLE public.rewards_progreso;
DROP TABLE public.lessons_nivel;
DROP TABLE public.lessons_mundo;
DROP TABLE public.lessons_materialdidactico_niveles;
DROP TABLE public.lessons_materialdidactico;
DROP TABLE public.lessons_categoria;
DROP TABLE public.django_session;
DROP TABLE public.django_migrations;
DROP TABLE public.django_content_type;
DROP TABLE public.django_admin_log;
DROP TABLE public.auth_permission;
DROP TABLE public.auth_group_permissions;
DROP TABLE public.auth_group;
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO postgres;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO postgres;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_group_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO postgres;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.auth_permission ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.auth_permission_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO postgres;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_admin_log ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_admin_log_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO postgres;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_content_type ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_content_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO postgres;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.django_migrations ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO postgres;

--
-- Name: lessons_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons_categoria (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion character varying(100)
);


ALTER TABLE public.lessons_categoria OWNER TO postgres;

--
-- Name: lessons_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessons_categoria ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.lessons_categoria_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: lessons_materialdidactico; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons_materialdidactico (
    id bigint NOT NULL,
    descripcion text NOT NULL,
    tipo character varying(50) NOT NULL,
    url character varying(255) NOT NULL,
    categoria_id bigint
);


ALTER TABLE public.lessons_materialdidactico OWNER TO postgres;

--
-- Name: lessons_materialdidactico_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessons_materialdidactico ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.lessons_materialdidactico_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: lessons_materialdidactico_niveles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons_materialdidactico_niveles (
    id bigint NOT NULL,
    materialdidactico_id bigint NOT NULL,
    nivel_id bigint NOT NULL
);


ALTER TABLE public.lessons_materialdidactico_niveles OWNER TO postgres;

--
-- Name: lessons_materialdidactico_niveles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessons_materialdidactico_niveles ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.lessons_materialdidactico_niveles_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: lessons_mundo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons_mundo (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    descripcion text
);


ALTER TABLE public.lessons_mundo OWNER TO postgres;

--
-- Name: lessons_mundo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessons_mundo ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.lessons_mundo_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: lessons_nivel; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lessons_nivel (
    id bigint NOT NULL,
    nivel integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    dificultad character varying(50) NOT NULL,
    mundo_id bigint NOT NULL
);


ALTER TABLE public.lessons_nivel OWNER TO postgres;

--
-- Name: lessons_nivel_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.lessons_nivel ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.lessons_nivel_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rewards_progreso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rewards_progreso (
    id bigint NOT NULL,
    porcentaje_avance numeric(5,2) NOT NULL,
    intentos_realizados integer NOT NULL,
    fecha_fin date,
    nivel_id bigint NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.rewards_progreso OWNER TO postgres;

--
-- Name: rewards_progreso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rewards_progreso ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.rewards_progreso_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: rewards_recompensa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rewards_recompensa (
    id bigint NOT NULL,
    nombre character varying(50) NOT NULL,
    url character varying(255) NOT NULL,
    nivel_id bigint
);


ALTER TABLE public.rewards_recompensa OWNER TO postgres;

--
-- Name: rewards_recompensa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.rewards_recompensa ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.rewards_recompensa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_logro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_logro (
    id bigint NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text NOT NULL,
    insignia_url character varying(255) NOT NULL
);


ALTER TABLE public.users_logro OWNER TO postgres;

--
-- Name: users_logro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_logro ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_logro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_perfil; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_perfil (
    usuario_id bigint NOT NULL,
    avatar character varying(255),
    apellidos_padre character varying(150) NOT NULL,
    nombre_padre character varying(100) NOT NULL
);


ALTER TABLE public.users_perfil OWNER TO postgres;

--
-- Name: users_rol; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_rol (
    id bigint NOT NULL,
    nombre character varying(25) NOT NULL,
    descripcion character varying(50) NOT NULL
);


ALTER TABLE public.users_rol OWNER TO postgres;

--
-- Name: users_rol_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_rol ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_rol_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_usuario (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL,
    rol_id bigint,
    nombre_menor character varying(150) NOT NULL
);


ALTER TABLE public.users_usuario OWNER TO postgres;

--
-- Name: users_usuario_groups; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_usuario_groups (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.users_usuario_groups OWNER TO postgres;

--
-- Name: users_usuario_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_usuario_groups ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_usuario_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_usuario ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_usuario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_usuario_user_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_usuario_user_permissions (
    id bigint NOT NULL,
    usuario_id bigint NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.users_usuario_user_permissions OWNER TO postgres;

--
-- Name: users_usuario_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_usuario_user_permissions ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_usuario_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: users_usuariologro; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_usuariologro (
    id bigint NOT NULL,
    fecha_obtenido date NOT NULL,
    logro_id bigint NOT NULL,
    usuario_id bigint NOT NULL
);


ALTER TABLE public.users_usuariologro OWNER TO postgres;

--
-- Name: users_usuariologro_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users_usuariologro ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public.users_usuariologro_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add user	6	add_usuario
22	Can change user	6	change_usuario
23	Can delete user	6	delete_usuario
24	Can view user	6	view_usuario
25	Can add logro	7	add_logro
26	Can change logro	7	change_logro
27	Can delete logro	7	delete_logro
28	Can view logro	7	view_logro
29	Can add rol	8	add_rol
30	Can change rol	8	change_rol
31	Can delete rol	8	delete_rol
32	Can view rol	8	view_rol
33	Can add perfil	9	add_perfil
34	Can change perfil	9	change_perfil
35	Can delete perfil	9	delete_perfil
36	Can view perfil	9	view_perfil
37	Can add usuario logro	10	add_usuariologro
38	Can change usuario logro	10	change_usuariologro
39	Can delete usuario logro	10	delete_usuariologro
40	Can view usuario logro	10	view_usuariologro
41	Can add categoria	11	add_categoria
42	Can change categoria	11	change_categoria
43	Can delete categoria	11	delete_categoria
44	Can view categoria	11	view_categoria
45	Can add mundo	12	add_mundo
46	Can change mundo	12	change_mundo
47	Can delete mundo	12	delete_mundo
48	Can view mundo	12	view_mundo
49	Can add nivel	13	add_nivel
50	Can change nivel	13	change_nivel
51	Can delete nivel	13	delete_nivel
52	Can view nivel	13	view_nivel
53	Can add material didactico	14	add_materialdidactico
54	Can change material didactico	14	change_materialdidactico
55	Can delete material didactico	14	delete_materialdidactico
56	Can view material didactico	14	view_materialdidactico
57	Can add recompensa	15	add_recompensa
58	Can change recompensa	15	change_recompensa
59	Can delete recompensa	15	delete_recompensa
60	Can view recompensa	15	view_recompensa
61	Can add progreso	16	add_progreso
62	Can change progreso	16	change_progreso
63	Can delete progreso	16	delete_progreso
64	Can view progreso	16	view_progreso
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	users	usuario
7	users	logro
8	users	rol
9	users	perfil
10	users	usuariologro
11	lessons	categoria
12	lessons	mundo
13	lessons	nivel
14	lessons	materialdidactico
15	rewards	recompensa
16	rewards	progreso
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2025-07-24 00:56:28.285801-07
2	contenttypes	0002_remove_content_type_name	2025-07-24 00:56:28.296763-07
3	auth	0001_initial	2025-07-24 00:56:28.35408-07
4	auth	0002_alter_permission_name_max_length	2025-07-24 00:56:28.359415-07
5	auth	0003_alter_user_email_max_length	2025-07-24 00:56:28.365712-07
6	auth	0004_alter_user_username_opts	2025-07-24 00:56:28.370795-07
7	auth	0005_alter_user_last_login_null	2025-07-24 00:56:28.375127-07
8	auth	0006_require_contenttypes_0002	2025-07-24 00:56:28.376784-07
9	auth	0007_alter_validators_add_error_messages	2025-07-24 00:56:28.381903-07
10	auth	0008_alter_user_username_max_length	2025-07-24 00:56:28.386783-07
11	auth	0009_alter_user_last_name_max_length	2025-07-24 00:56:28.391273-07
12	auth	0010_alter_group_name_max_length	2025-07-24 00:56:28.400036-07
13	auth	0011_update_proxy_permissions	2025-07-24 00:56:28.405752-07
14	auth	0012_alter_user_first_name_max_length	2025-07-24 00:56:28.410106-07
15	users	0001_initial	2025-07-24 00:56:28.516125-07
16	admin	0001_initial	2025-07-24 00:56:28.548907-07
17	admin	0002_logentry_remove_auto_add	2025-07-24 00:56:28.558382-07
18	admin	0003_logentry_add_action_flag_choices	2025-07-24 00:56:28.567794-07
19	lessons	0001_initial	2025-07-24 00:56:28.628459-07
20	rewards	0001_initial	2025-07-24 00:56:28.656976-07
21	rewards	0002_initial	2025-07-24 00:56:28.697513-07
22	sessions	0001_initial	2025-07-24 00:56:28.728345-07
23	users	0002_alter_usuario_options_alter_usuario_managers_and_more	2025-07-29 00:49:02.038846-07
24	users	0003_alter_perfil_avatar	2025-07-29 02:20:23.092313-07
25	rewards	0003_recompensa_es_avatar_alter_recompensa_nivel_and_more	2025-07-29 02:53:25.839496-07
26	rewards	0004_remove_recompensa_es_avatar	2025-07-29 16:23:05.593396-07
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Data for Name: lessons_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons_categoria (id, nombre, descripcion) FROM stdin;
1	Abecedario	Aprende las letras del alfabeto en LSM.
2	Saludos	Formas básicas de saludar en LSM.
3	Colores	Identifica y señala colores en LSM.
4	Numeros	Cuenta del 1 al 10 y más en LSM.
5	Animales	Nombres de animales usando LSM.
6	Emociones	Expresa cómo te sientes en LSM.
7	Familia	Nombra a los miembros de la familia.
8	Preguntas	Aprende a hacer preguntas básicas en LSM.
\.


--
-- Data for Name: lessons_materialdidactico; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons_materialdidactico (id, descripcion, tipo, url, categoria_id) FROM stdin;
1	Alfabeto de Lengua de Señas Mexicana	Video	https://www.youtube.com/watch?v=vXSSgzXJy1Q	1
2	LSM Abecedario | Lengua de Señas Mexicana	Video	https://www.youtube.com/watch?v=BXD1wu6yEOQ	1
3	LSM Saludos y despedidas. | Lengua de Señas Mexicana.	Video	https://www.youtube.com/watch?v=YNBeHPcxlR0	2
4	Saludos y Cortesía, Lengua de Señas Mexicana	Video	https://www.youtube.com/watch?v=PCHx3s-cwLU	2
5	Video sobre colores LSM	Video	https://youtu.be/pRYRjk2Bw_A?si=Y_RHRPOQhCdkmmmP	3
6	Colores en LSM	Video	https://youtu.be/ecPvbRd2a-4?si=kurCWTnOWBuhgVPc	3
7	numeros del 1 al 10 en LSM	Video	https://youtu.be/5TCARa8YGAU?si=qERU0nLxMFnc8cyS	4
8	numeros del 1 al 20 en LSM	Video	https://youtu.be/Uc150cylYOQ?si=upMdozCDUI29oVvq	4
9	Video didactico de la familia en LSM	Video	http://signlingus/video-familia-LSM	7
10	2do video didactico de la familia en LSM	Video	http://signlingus/videodos-familia-LSM	7
11	Video didactico de preguntas en LSM	Video	http://signlingus/video-preguntas-LSM	8
12	2do video didactico de preguntas en LSM	Video	http://signlingus/videodos-preguntas-LSM	8
13	PDF didactico de preguntas en LSM	PDF	http://signlingus/preguntasl-lsm.pdf	8
\.


--
-- Data for Name: lessons_materialdidactico_niveles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons_materialdidactico_niveles (id, materialdidactico_id, nivel_id) FROM stdin;
\.


--
-- Data for Name: lessons_mundo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons_mundo (id, nombre, descripcion) FROM stdin;
1	Playa	Aprende las letras y saluda como un verdadero explorador costero.
2	Ciudad	Recorre la ciudad mientras aprendes los colores y a contar.
3	Jungla	Descubre criaturas salvajes y cómo se sienten en lo profundo de la jungla.
4	Castillo	Conoce a la familia real y aprende a hacer preguntas como todo un caballero.
5	Mundo Misterioso	Un mundo especial por descubrir.
\.


--
-- Data for Name: lessons_nivel; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lessons_nivel (id, nivel, nombre, descripcion, dificultad, mundo_id) FROM stdin;
1	1	Nivel 1 Abecedario	Nivel 1 Abecedario.	1	1
2	2	Nivel 2 Abecedario Avanzado	Nivel 2 Abecedario Avanzado	1	1
3	3	Nivel 3 Saludos	Nivel 3 Saludos	2	1
4	4	Nivel 4 Saludos y Abecedario	Nivel 4 Saludos y Abecedario	2	1
5	5	Nivel 1 Colores	Nivel 1 colores Ciudad	Normal	2
6	6	Nivel 2 Colores	Nivel 2 colores Ciudad	Dificil	2
7	7	Nivel 3 Numeros	Nivel 3 numeros Ciudad	Normal	2
8	8	Nivel 4 Numeros y Colores	Nivel 4 numeros y colores Ciudad	Difícil	2
9	9	Nivel 1 Familia	Nivel 1 del mundo 4/familia	4	4
10	10	Nivel 2 Familia y Preguntas	Nivel 2 del mundo 4/familia y preguntas	4	4
11	11	Nivel 3 Familia Avanzado	Nivel 3 del mundo 4/familia	5	4
12	12	Nivel 4 Familia y Preguntas Avanzado	Nivel 4 del mundo 4/familia y preguntas	5	4
13	13	Nivel ???	Nivel ???	6	5
\.


--
-- Data for Name: rewards_progreso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rewards_progreso (id, porcentaje_avance, intentos_realizados, fecha_fin, nivel_id, usuario_id) FROM stdin;
\.


--
-- Data for Name: rewards_recompensa; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.rewards_recompensa (id, nombre, url, nivel_id) FROM stdin;
1	Playero	avatar1.png	1
2	Coolio	avatar2.png	2
3	Velocín	avatar3.png	3
4	DJ Jungla	avatar4.png	4
5	Corazón de Castillo	avatar5.png	12
6	Astronauto	avatar6.png	8
7	Saltín Playa	avatar7.png	4
8	Chango Detective	avatar8.png	13
\.


--
-- Data for Name: users_logro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_logro (id, nombre, descripcion, insignia_url) FROM stdin;
1	Explorador de la Playa	¡Has completado todas las aventuras en la playa!	src/assets/insignias/explorador_playa.png
2	Conquistador del Castillo	¡Misión cumplida en el majestuoso castillo!	src/assets/insignias/conquistador_castillo.png
3	Descubridor de la Jungla	¡Has superado todos los desafíos selváticos!	src/assets/insignias/descubridor_jungla.png
4	Héroe de la Ciudad	¡Recorriste cada rincón de la ciudad y lo lograste!	src/assets/insignias/heroe_ciudad.png
5	Maestro de la Playa	¡Has dominado cada detalle de la playa!	src/assets/insignias/maestro_playa.png
6	Señor del Castillo	¡El castillo no guarda secretos para ti!	src/assets/insignias/señor_castillo.png
7	Sabio de la Jungla	¡Has perfeccionado la jungla como un verdadero experto!	src/assets/insignias/sabio_jungla.png
8	Leyenda Urbana	¡La ciudad está a tus pies, impecablemente conquistada!	src/assets/insignias/leyenda_urbana.png
9	Detective de lo Desconocido	¡Has resuelto los enigmas del Mundo Misterioso!	src/assets/insignias/detective_misterio.png
\.


--
-- Data for Name: users_perfil; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_perfil (usuario_id, avatar, apellidos_padre, nombre_padre) FROM stdin;
2	avatar1.png	test test	Test
\.


--
-- Data for Name: users_rol; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_rol (id, nombre, descripcion) FROM stdin;
1	Administrador	Gestiona usuarios y contenido.
2	Asesor	Sube material y ve progreso.
3	Estudiante	Juega y aprende con la plataforma.
\.


--
-- Data for Name: users_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_usuario (id, password, last_login, is_superuser, username, email, is_staff, is_active, date_joined, rol_id, nombre_menor) FROM stdin;
1	pbkdf2_sha256$1000000$2RCZwaS80JF59ba7dLHdql$hztRn+Fey/Pt+qETH0tT6203q21gpNlaKTZoDbLlVLk=	\N	t	admin	admin@gmail.com	t	t	2025-07-24 01:32:01.486907-07	1	
2	pbkdf2_sha256$1000000$i3HN2NCBw0RM7SwjKaaa3J$xyDDbb7cyJ2nXZH1CSXLi2csuU9L6glsUAeLLQkgnXo=	\N	f	testniño	test@gmail.com	f	t	2025-07-29 01:10:02.91845-07	\N	tesniño
\.


--
-- Data for Name: users_usuario_groups; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_usuario_groups (id, usuario_id, group_id) FROM stdin;
\.


--
-- Data for Name: users_usuario_user_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_usuario_user_permissions (id, usuario_id, permission_id) FROM stdin;
\.


--
-- Data for Name: users_usuariologro; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_usuariologro (id, fecha_obtenido, logro_id, usuario_id) FROM stdin;
\.


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 64, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 16, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 26, true);


--
-- Name: lessons_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_categoria_id_seq', 8, true);


--
-- Name: lessons_materialdidactico_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_materialdidactico_id_seq', 13, true);


--
-- Name: lessons_materialdidactico_niveles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_materialdidactico_niveles_id_seq', 1, false);


--
-- Name: lessons_mundo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_mundo_id_seq', 5, true);


--
-- Name: lessons_nivel_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lessons_nivel_id_seq', 13, true);


--
-- Name: rewards_progreso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rewards_progreso_id_seq', 1, false);


--
-- Name: rewards_recompensa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rewards_recompensa_id_seq', 9, true);


--
-- Name: users_logro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_logro_id_seq', 9, true);


--
-- Name: users_rol_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_rol_id_seq', 18, true);


--
-- Name: users_usuario_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_usuario_groups_id_seq', 1, false);


--
-- Name: users_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_usuario_id_seq', 2, true);


--
-- Name: users_usuario_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_usuario_user_permissions_id_seq', 1, false);


--
-- Name: users_usuariologro_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_usuariologro_id_seq', 1, false);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: lessons_categoria lessons_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_categoria
    ADD CONSTRAINT lessons_categoria_pkey PRIMARY KEY (id);


--
-- Name: lessons_materialdidactico_niveles lessons_materialdidactic_materialdidactico_id_niv_2da0ba17_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_materialdidactico_niveles
    ADD CONSTRAINT lessons_materialdidactic_materialdidactico_id_niv_2da0ba17_uniq UNIQUE (materialdidactico_id, nivel_id);


--
-- Name: lessons_materialdidactico_niveles lessons_materialdidactico_niveles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_materialdidactico_niveles
    ADD CONSTRAINT lessons_materialdidactico_niveles_pkey PRIMARY KEY (id);


--
-- Name: lessons_materialdidactico lessons_materialdidactico_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_materialdidactico
    ADD CONSTRAINT lessons_materialdidactico_pkey PRIMARY KEY (id);


--
-- Name: lessons_mundo lessons_mundo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_mundo
    ADD CONSTRAINT lessons_mundo_pkey PRIMARY KEY (id);


--
-- Name: lessons_nivel lessons_nivel_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_nivel
    ADD CONSTRAINT lessons_nivel_pkey PRIMARY KEY (id);


--
-- Name: rewards_progreso rewards_progreso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards_progreso
    ADD CONSTRAINT rewards_progreso_pkey PRIMARY KEY (id);


--
-- Name: rewards_recompensa rewards_recompensa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards_recompensa
    ADD CONSTRAINT rewards_recompensa_pkey PRIMARY KEY (id);


--
-- Name: users_logro users_logro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_logro
    ADD CONSTRAINT users_logro_pkey PRIMARY KEY (id);


--
-- Name: users_perfil users_perfil_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_perfil
    ADD CONSTRAINT users_perfil_pkey PRIMARY KEY (usuario_id);


--
-- Name: users_rol users_rol_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_rol
    ADD CONSTRAINT users_rol_pkey PRIMARY KEY (id);


--
-- Name: users_usuario users_usuario_email_b77ec988_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario
    ADD CONSTRAINT users_usuario_email_b77ec988_uniq UNIQUE (email);


--
-- Name: users_usuario_groups users_usuario_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_groups
    ADD CONSTRAINT users_usuario_groups_pkey PRIMARY KEY (id);


--
-- Name: users_usuario_groups users_usuario_groups_usuario_id_group_id_db69fe93_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_groups
    ADD CONSTRAINT users_usuario_groups_usuario_id_group_id_db69fe93_uniq UNIQUE (usuario_id, group_id);


--
-- Name: users_usuario users_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario
    ADD CONSTRAINT users_usuario_pkey PRIMARY KEY (id);


--
-- Name: users_usuario_user_permissions users_usuario_user_permi_usuario_id_permission_id_9b373975_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_user_permissions
    ADD CONSTRAINT users_usuario_user_permi_usuario_id_permission_id_9b373975_uniq UNIQUE (usuario_id, permission_id);


--
-- Name: users_usuario_user_permissions users_usuario_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_user_permissions
    ADD CONSTRAINT users_usuario_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: users_usuario users_usuario_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario
    ADD CONSTRAINT users_usuario_username_key UNIQUE (username);


--
-- Name: users_usuariologro users_usuariologro_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuariologro
    ADD CONSTRAINT users_usuariologro_pkey PRIMARY KEY (id);


--
-- Name: users_usuariologro users_usuariologro_usuario_id_logro_id_c9124d3c_uniq; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuariologro
    ADD CONSTRAINT users_usuariologro_usuario_id_logro_id_c9124d3c_uniq UNIQUE (usuario_id, logro_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: lessons_materialdidactico_categoria_id_985ecd4a; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lessons_materialdidactico_categoria_id_985ecd4a ON public.lessons_materialdidactico USING btree (categoria_id);


--
-- Name: lessons_materialdidactico_niveles_materialdidactico_id_b9fbff00; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lessons_materialdidactico_niveles_materialdidactico_id_b9fbff00 ON public.lessons_materialdidactico_niveles USING btree (materialdidactico_id);


--
-- Name: lessons_materialdidactico_niveles_nivel_id_edc6a3ff; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lessons_materialdidactico_niveles_nivel_id_edc6a3ff ON public.lessons_materialdidactico_niveles USING btree (nivel_id);


--
-- Name: lessons_nivel_mundo_id_aa2f884e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX lessons_nivel_mundo_id_aa2f884e ON public.lessons_nivel USING btree (mundo_id);


--
-- Name: rewards_progreso_nivel_id_afa3f001; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_progreso_nivel_id_afa3f001 ON public.rewards_progreso USING btree (nivel_id);


--
-- Name: rewards_progreso_usuario_id_1741dc68; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_progreso_usuario_id_1741dc68 ON public.rewards_progreso USING btree (usuario_id);


--
-- Name: rewards_recompensa_nivel_id_e3a803b8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX rewards_recompensa_nivel_id_e3a803b8 ON public.rewards_recompensa USING btree (nivel_id);


--
-- Name: users_usuario_email_b77ec988_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_email_b77ec988_like ON public.users_usuario USING btree (email varchar_pattern_ops);


--
-- Name: users_usuario_groups_group_id_9d969afd; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_groups_group_id_9d969afd ON public.users_usuario_groups USING btree (group_id);


--
-- Name: users_usuario_groups_usuario_id_3a8a9a06; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_groups_usuario_id_3a8a9a06 ON public.users_usuario_groups USING btree (usuario_id);


--
-- Name: users_usuario_rol_id_9bc301ef; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_rol_id_9bc301ef ON public.users_usuario USING btree (rol_id);


--
-- Name: users_usuario_user_permissions_permission_id_bf5f5453; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_user_permissions_permission_id_bf5f5453 ON public.users_usuario_user_permissions USING btree (permission_id);


--
-- Name: users_usuario_user_permissions_usuario_id_75526fda; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_user_permissions_usuario_id_75526fda ON public.users_usuario_user_permissions USING btree (usuario_id);


--
-- Name: users_usuario_username_399a0cac_like; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuario_username_399a0cac_like ON public.users_usuario USING btree (username varchar_pattern_ops);


--
-- Name: users_usuariologro_logro_id_8f013a09; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuariologro_logro_id_8f013a09 ON public.users_usuariologro USING btree (logro_id);


--
-- Name: users_usuariologro_usuario_id_5d47101e; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX users_usuariologro_usuario_id_5d47101e ON public.users_usuariologro USING btree (usuario_id);


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_users_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_users_usuario_id FOREIGN KEY (user_id) REFERENCES public.users_usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: lessons_materialdidactico lessons_materialdida_categoria_id_985ecd4a_fk_lessons_c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_materialdidactico
    ADD CONSTRAINT lessons_materialdida_categoria_id_985ecd4a_fk_lessons_c FOREIGN KEY (categoria_id) REFERENCES public.lessons_categoria(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: lessons_materialdidactico_niveles lessons_materialdida_materialdidactico_id_b9fbff00_fk_lessons_m; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_materialdidactico_niveles
    ADD CONSTRAINT lessons_materialdida_materialdidactico_id_b9fbff00_fk_lessons_m FOREIGN KEY (materialdidactico_id) REFERENCES public.lessons_materialdidactico(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: lessons_materialdidactico_niveles lessons_materialdida_nivel_id_edc6a3ff_fk_lessons_n; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_materialdidactico_niveles
    ADD CONSTRAINT lessons_materialdida_nivel_id_edc6a3ff_fk_lessons_n FOREIGN KEY (nivel_id) REFERENCES public.lessons_nivel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: lessons_nivel lessons_nivel_mundo_id_aa2f884e_fk_lessons_mundo_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lessons_nivel
    ADD CONSTRAINT lessons_nivel_mundo_id_aa2f884e_fk_lessons_mundo_id FOREIGN KEY (mundo_id) REFERENCES public.lessons_mundo(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: rewards_progreso rewards_progreso_nivel_id_afa3f001_fk_lessons_nivel_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards_progreso
    ADD CONSTRAINT rewards_progreso_nivel_id_afa3f001_fk_lessons_nivel_id FOREIGN KEY (nivel_id) REFERENCES public.lessons_nivel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: rewards_progreso rewards_progreso_usuario_id_1741dc68_fk_users_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards_progreso
    ADD CONSTRAINT rewards_progreso_usuario_id_1741dc68_fk_users_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.users_usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: rewards_recompensa rewards_recompensa_nivel_id_e3a803b8_fk_lessons_nivel_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rewards_recompensa
    ADD CONSTRAINT rewards_recompensa_nivel_id_e3a803b8_fk_lessons_nivel_id FOREIGN KEY (nivel_id) REFERENCES public.lessons_nivel(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_perfil users_perfil_usuario_id_6ba4465b_fk_users_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_perfil
    ADD CONSTRAINT users_perfil_usuario_id_6ba4465b_fk_users_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.users_usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuario_groups users_usuario_groups_group_id_9d969afd_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_groups
    ADD CONSTRAINT users_usuario_groups_group_id_9d969afd_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuario_groups users_usuario_groups_usuario_id_3a8a9a06_fk_users_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_groups
    ADD CONSTRAINT users_usuario_groups_usuario_id_3a8a9a06_fk_users_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.users_usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuario users_usuario_rol_id_9bc301ef_fk_users_rol_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario
    ADD CONSTRAINT users_usuario_rol_id_9bc301ef_fk_users_rol_id FOREIGN KEY (rol_id) REFERENCES public.users_rol(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuario_user_permissions users_usuario_user_p_permission_id_bf5f5453_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_user_permissions
    ADD CONSTRAINT users_usuario_user_p_permission_id_bf5f5453_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuario_user_permissions users_usuario_user_p_usuario_id_75526fda_fk_users_usu; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuario_user_permissions
    ADD CONSTRAINT users_usuario_user_p_usuario_id_75526fda_fk_users_usu FOREIGN KEY (usuario_id) REFERENCES public.users_usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuariologro users_usuariologro_logro_id_8f013a09_fk_users_logro_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuariologro
    ADD CONSTRAINT users_usuariologro_logro_id_8f013a09_fk_users_logro_id FOREIGN KEY (logro_id) REFERENCES public.users_logro(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: users_usuariologro users_usuariologro_usuario_id_5d47101e_fk_users_usuario_id; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users_usuariologro
    ADD CONSTRAINT users_usuariologro_usuario_id_5d47101e_fk_users_usuario_id FOREIGN KEY (usuario_id) REFERENCES public.users_usuario(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

