PGDMP  %    (                }            site    17.5    17.5 =               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            	           1262    16388    site    DATABASE     x   CREATE DATABASE site WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE site;
                     postgres    false            �            1259    16418    about_us    TABLE     �   CREATE TABLE public.about_us (
    about_id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    text text,
    image character varying(255)
);
    DROP TABLE public.about_us;
       public         heap r       postgres    false            �            1259    16417    about_us_about_id_seq    SEQUENCE     �   CREATE SEQUENCE public.about_us_about_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.about_us_about_id_seq;
       public               postgres    false    224            
           0    0    about_us_about_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.about_us_about_id_seq OWNED BY public.about_us.about_id;
          public               postgres    false    223            �            1259    16400    booking    TABLE     g  CREATE TABLE public.booking (
    booking_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    people integer NOT NULL,
    date date NOT NULL,
    "time" time without time zone NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.booking;
       public         heap r       postgres    false            �            1259    16399    booking_booking_id_seq    SEQUENCE     �   CREATE SEQUENCE public.booking_booking_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.booking_booking_id_seq;
       public               postgres    false    220                       0    0    booking_booking_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.booking_booking_id_seq OWNED BY public.booking.booking_id;
          public               postgres    false    219            �            1259    16408    contact    TABLE     !  CREATE TABLE public.contact (
    contact_id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    phone character varying(20) NOT NULL,
    message text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);
    DROP TABLE public.contact;
       public         heap r       postgres    false            �            1259    16407    contact_contact_id_seq    SEQUENCE     �   CREATE SEQUENCE public.contact_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.contact_contact_id_seq;
       public               postgres    false    222                       0    0    contact_contact_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.contact_contact_id_seq OWNED BY public.contact.contact_id;
          public               postgres    false    221            �            1259    16473    delicious_menu    TABLE     *  CREATE TABLE public.delicious_menu (
    menu_id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    price numeric(10,2) NOT NULL,
    on_main boolean DEFAULT false,
    category character varying(50) DEFAULT 'other'::character varying NOT NULL
);
 "   DROP TABLE public.delicious_menu;
       public         heap r       postgres    false            �            1259    16472    delicious_menu_menu_id_seq    SEQUENCE     �   CREATE SEQUENCE public.delicious_menu_menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 1   DROP SEQUENCE public.delicious_menu_menu_id_seq;
       public               postgres    false    232                       0    0    delicious_menu_menu_id_seq    SEQUENCE OWNED BY     Y   ALTER SEQUENCE public.delicious_menu_menu_id_seq OWNED BY public.delicious_menu.menu_id;
          public               postgres    false    231            �            1259    16427    our_team    TABLE     �   CREATE TABLE public.our_team (
    team_id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    text text,
    image character varying(255)
);
    DROP TABLE public.our_team;
       public         heap r       postgres    false            �            1259    16426    our_team_team_id_seq    SEQUENCE     �   CREATE SEQUENCE public.our_team_team_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 +   DROP SEQUENCE public.our_team_team_id_seq;
       public               postgres    false    226                       0    0    our_team_team_id_seq    SEQUENCE OWNED BY     M   ALTER SEQUENCE public.our_team_team_id_seq OWNED BY public.our_team.team_id;
          public               postgres    false    225            �            1259    16455    private_events    TABLE     �   CREATE TABLE public.private_events (
    event_id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    text text,
    image character varying(255)
);
 "   DROP TABLE public.private_events;
       public         heap r       postgres    false            �            1259    16454    private_events_event_id_seq    SEQUENCE     �   CREATE SEQUENCE public.private_events_event_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 2   DROP SEQUENCE public.private_events_event_id_seq;
       public               postgres    false    230                       0    0    private_events_event_id_seq    SEQUENCE OWNED BY     [   ALTER SEQUENCE public.private_events_event_id_seq OWNED BY public.private_events.event_id;
          public               postgres    false    229            �            1259    16436    specialties    TABLE     �   CREATE TABLE public.specialties (
    specialty_id integer NOT NULL,
    title character varying(255) NOT NULL,
    subtitle character varying(255),
    text text,
    image character varying(255)
);
    DROP TABLE public.specialties;
       public         heap r       postgres    false            �            1259    16435    specialties_specialty_id_seq    SEQUENCE     �   CREATE SEQUENCE public.specialties_specialty_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 3   DROP SEQUENCE public.specialties_specialty_id_seq;
       public               postgres    false    228                       0    0    specialties_specialty_id_seq    SEQUENCE OWNED BY     ]   ALTER SEQUENCE public.specialties_specialty_id_seq OWNED BY public.specialties.specialty_id;
          public               postgres    false    227            �            1259    16390    users    TABLE     �  CREATE TABLE public.users (
    user_id integer NOT NULL,
    full_name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    phone character varying(20),
    reset_token character varying(100),
    reset_expiry timestamp without time zone
);
    DROP TABLE public.users;
       public         heap r       postgres    false            �            1259    16389    users_user_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.users_user_id_seq;
       public               postgres    false    218                       0    0    users_user_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;
          public               postgres    false    217            J           2604    16421    about_us about_id    DEFAULT     v   ALTER TABLE ONLY public.about_us ALTER COLUMN about_id SET DEFAULT nextval('public.about_us_about_id_seq'::regclass);
 @   ALTER TABLE public.about_us ALTER COLUMN about_id DROP DEFAULT;
       public               postgres    false    223    224    224            F           2604    16403    booking booking_id    DEFAULT     x   ALTER TABLE ONLY public.booking ALTER COLUMN booking_id SET DEFAULT nextval('public.booking_booking_id_seq'::regclass);
 A   ALTER TABLE public.booking ALTER COLUMN booking_id DROP DEFAULT;
       public               postgres    false    220    219    220            H           2604    16411    contact contact_id    DEFAULT     x   ALTER TABLE ONLY public.contact ALTER COLUMN contact_id SET DEFAULT nextval('public.contact_contact_id_seq'::regclass);
 A   ALTER TABLE public.contact ALTER COLUMN contact_id DROP DEFAULT;
       public               postgres    false    222    221    222            N           2604    16476    delicious_menu menu_id    DEFAULT     �   ALTER TABLE ONLY public.delicious_menu ALTER COLUMN menu_id SET DEFAULT nextval('public.delicious_menu_menu_id_seq'::regclass);
 E   ALTER TABLE public.delicious_menu ALTER COLUMN menu_id DROP DEFAULT;
       public               postgres    false    232    231    232            K           2604    16430    our_team team_id    DEFAULT     t   ALTER TABLE ONLY public.our_team ALTER COLUMN team_id SET DEFAULT nextval('public.our_team_team_id_seq'::regclass);
 ?   ALTER TABLE public.our_team ALTER COLUMN team_id DROP DEFAULT;
       public               postgres    false    226    225    226            M           2604    16458    private_events event_id    DEFAULT     �   ALTER TABLE ONLY public.private_events ALTER COLUMN event_id SET DEFAULT nextval('public.private_events_event_id_seq'::regclass);
 F   ALTER TABLE public.private_events ALTER COLUMN event_id DROP DEFAULT;
       public               postgres    false    229    230    230            L           2604    16439    specialties specialty_id    DEFAULT     �   ALTER TABLE ONLY public.specialties ALTER COLUMN specialty_id SET DEFAULT nextval('public.specialties_specialty_id_seq'::regclass);
 G   ALTER TABLE public.specialties ALTER COLUMN specialty_id DROP DEFAULT;
       public               postgres    false    228    227    228            D           2604    16393    users user_id    DEFAULT     n   ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);
 <   ALTER TABLE public.users ALTER COLUMN user_id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    16418    about_us 
   TABLE DATA           J   COPY public.about_us (about_id, title, subtitle, text, image) FROM stdin;
    public               postgres    false    224   ^H       �          0    16400    booking 
   TABLE DATA           c   COPY public.booking (booking_id, name, email, phone, people, date, "time", created_at) FROM stdin;
    public               postgres    false    220   �J       �          0    16408    contact 
   TABLE DATA           V   COPY public.contact (contact_id, name, email, phone, message, created_at) FROM stdin;
    public               postgres    false    222   N                 0    16473    delicious_menu 
   TABLE DATA           \   COPY public.delicious_menu (menu_id, title, subtitle, price, on_main, category) FROM stdin;
    public               postgres    false    232   �O       �          0    16427    our_team 
   TABLE DATA           I   COPY public.our_team (team_id, title, subtitle, text, image) FROM stdin;
    public               postgres    false    226   ,T                 0    16455    private_events 
   TABLE DATA           P   COPY public.private_events (event_id, title, subtitle, text, image) FROM stdin;
    public               postgres    false    230   zU       �          0    16436    specialties 
   TABLE DATA           Q   COPY public.specialties (specialty_id, title, subtitle, text, image) FROM stdin;
    public               postgres    false    228   CW       �          0    16390    users 
   TABLE DATA           r   COPY public.users (user_id, full_name, email, password, created_at, phone, reset_token, reset_expiry) FROM stdin;
    public               postgres    false    218   �Y                  0    0    about_us_about_id_seq    SEQUENCE SET     C   SELECT pg_catalog.setval('public.about_us_about_id_seq', 1, true);
          public               postgres    false    223                       0    0    booking_booking_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.booking_booking_id_seq', 37, true);
          public               postgres    false    219                       0    0    contact_contact_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.contact_contact_id_seq', 11, true);
          public               postgres    false    221                       0    0    delicious_menu_menu_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.delicious_menu_menu_id_seq', 26, true);
          public               postgres    false    231                       0    0    our_team_team_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.our_team_team_id_seq', 5, true);
          public               postgres    false    225                       0    0    private_events_event_id_seq    SEQUENCE SET     I   SELECT pg_catalog.setval('public.private_events_event_id_seq', 2, true);
          public               postgres    false    229                       0    0    specialties_specialty_id_seq    SEQUENCE SET     J   SELECT pg_catalog.setval('public.specialties_specialty_id_seq', 7, true);
          public               postgres    false    227                       0    0    users_user_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.users_user_id_seq', 12, true);
          public               postgres    false    217            Z           2606    16425    about_us about_us_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.about_us
    ADD CONSTRAINT about_us_pkey PRIMARY KEY (about_id);
 @   ALTER TABLE ONLY public.about_us DROP CONSTRAINT about_us_pkey;
       public                 postgres    false    224            V           2606    16406    booking booking_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.booking
    ADD CONSTRAINT booking_pkey PRIMARY KEY (booking_id);
 >   ALTER TABLE ONLY public.booking DROP CONSTRAINT booking_pkey;
       public                 postgres    false    220            X           2606    16416    contact contact_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.contact
    ADD CONSTRAINT contact_pkey PRIMARY KEY (contact_id);
 >   ALTER TABLE ONLY public.contact DROP CONSTRAINT contact_pkey;
       public                 postgres    false    222            b           2606    16481 "   delicious_menu delicious_menu_pkey 
   CONSTRAINT     e   ALTER TABLE ONLY public.delicious_menu
    ADD CONSTRAINT delicious_menu_pkey PRIMARY KEY (menu_id);
 L   ALTER TABLE ONLY public.delicious_menu DROP CONSTRAINT delicious_menu_pkey;
       public                 postgres    false    232            \           2606    16434    our_team our_team_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.our_team
    ADD CONSTRAINT our_team_pkey PRIMARY KEY (team_id);
 @   ALTER TABLE ONLY public.our_team DROP CONSTRAINT our_team_pkey;
       public                 postgres    false    226            `           2606    16462 "   private_events private_events_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.private_events
    ADD CONSTRAINT private_events_pkey PRIMARY KEY (event_id);
 L   ALTER TABLE ONLY public.private_events DROP CONSTRAINT private_events_pkey;
       public                 postgres    false    230            ^           2606    16443    specialties specialties_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.specialties
    ADD CONSTRAINT specialties_pkey PRIMARY KEY (specialty_id);
 F   ALTER TABLE ONLY public.specialties DROP CONSTRAINT specialties_pkey;
       public                 postgres    false    228            R           2606    16398    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public                 postgres    false    218            T           2606    16396    users users_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public                 postgres    false    218            �   K  x�uR�n�P]'_qW��H��J�@t�x��)��6jRӘ��b'mAI�-��ש�c��/��g�I�����93眙�[��Ҭ�����s`�7E�OSnS@�a�P��7wmӔƆ;<�u`(6r�=\'�DB�	)�H��&��/��gJ�/��h~R�d�qOhڷ��)��qrH��1(]Q�P��wE;w֠�F*8��`��)�G�G��Y�~������[����lhv_�]�o 1�]K0D@�� �x>�L<�D#(ES�C{�/���c�7O��Az���L{$���Dl�F���>���'����R�����H�ɼŨp%B�p�Bf����7��^�H3D&K���w�b�zM��@L`�2B�p!-GB0�8��1�� ��)�彲<�(.����Y�9�ĸA
lc��CE���|�*�h��h�k���4s�$��z~��#��Qjݑ�6L�?�*S�[��@N��r�Va�u��f�l7�G'�k��O�u��rw���U=l��;5����CD6��}�����so���r���^��v���3��~�q\?���^��b��rI�      �   ?  x��VKr�Jw��s����F���ǌ��$;�ļ(���0�nX l!���K�LLU�V���s?B����������}�Y'��;[_�1c� 2�_B|��`�<W ۻ��T�#eKS7��//��}p�D�V����1	{��~��u�r<Q�T���`�I��W�.{I^�x+�@�{>��mb��i8�eX�Ѣ����C��u��@���PA�Ȼ(�(Z���U�ԽZv�Yu��Y���(�Pܘ#b�89�P$
*L����&�I���8�`1l�j�5}�7}ݩj�#fp{�"W\N8YLŋs8�u���X)�G�A�
��,���=+��S��HX+T���f��O��	�3H�ӫ-�(M�*�۬cb�Q_�P��)e
��tCz�2͐���,��jT�9�r�$Qk�v��H�8�)imJł���	^̿m�x۷��FO'�����E���k˓7G��s
M��椌��1�������>V�]� ���GSRg�h6�]G�T����$��qo����9�Q��ma�%;%;���,��P0Z��3w�v�_�K�d]Nr ���y}��q�A��뤩���DP,�y�^]-N׭�����ʸi�5^�/M����f����b�Y�R��uD�N���I��P������e��^0&��� Ϣ����aY����?������9[_�^�?���m۫���Jf�R*�5��x�͜c䷍�A�!G>F�,����㺿�Rjo�o�U{��x~u�j������<��3��4S��=�A������lV���� >���%�bk}�CM�D���������      �   v  x���AN1E��)f��N'Y� ;6#:!�@��]/�� WhoD�)4���Ar�H�~v~�j��m���j��e�������=-ՙD�  �*�u(���!L6&r&2�&5r���֪_������6�5�@�$���@ڪ�.���ܽ�Uٝw�����G-"�^B�Q��rn��HРM
���X� �$�F<Y�U�/JLyY_�K4�j�K�	�Hd
���K�����@G |L���]���,��p".�e�ŠEm�M�N��[���>ɺ���]�:���8��(�K�ؠO�%��0X	:�����·O:��[q<��E���C��N�`���R	�F�G���..�8����k��$��l��[���KL\�         �  x�]U�r�6<C_��Y���c�d���&�ʵ{�eDI�@��r�_����ci�D�&�鞞���xtL�$_lO���J�/��dH'ގ�|U���c��]���U+$�Z>`ْӪ*�݁��ٞ{�!v��Rܕ��"��گn�G��e�x$G=k��6�x�0\�cn���� �#F�������I!E<�Ս�����s)�������<��Y�˯�����Uz?I�[���x}V!��i4K���T���|!��n��ڎm�X�b}Yn�O���3�q*�x�佪䠾�cII~+.2Joq�Xk*�}����H�k����0��U�yκZ_�?G
�Y��BY%>�#H��2/���m�����g[>��|&��$mF[����Qc�M�z�n!%*�&(C�Q�B��M=>Bi��j�1vԍ> ����>�n�v �������	T�V%��_ ������g��SƦ{[�v$S)ҙ�NS���t�7Yژf�� �i�Ր�e�vD�p�S;�X�ym_/*u�dh���f��L�gOP�Y�u%��fw�8(4C�v0�d��"�P�cN���N6���S�8�:٭�M5a^���T~<9�S ��c��B�������M�|�-�*5�S�L/gې���p�=m��ͯ�7ⱳ��X>с��=�oP9^T8ˆ�1�(��}?�2P���Nxy��n��~�g��_���%x��5��V-��������}��)���<�g�;�����
��Ɠ�q���1��)�16�,*,�80�d�̮�y]�U�湱6����:�	.ڔ������k���񀙲����@�+�<��8j}���:VS�ۣ�Q�h:���N�0�C����_1)(z�g
(}� ����z�*�W+�Tۅ��(?����8'�y�^Ǔ�'묭���2�[v��ƴT�����d&�&Ĺs)�RXC��!���qg�F��h��Ƹ�f#X���7v�]"�үJ_Ba���<� ��@7YGs\��[��A��Z���wJ'k�p�ܑ�,O2�I���y����X��؄5C���ż;t>[Z�Go������:Ov�ޯ`�O�za�Ϲ��t�0-���n8f����W��݈_��<�B���.|��b�
�EVs��ÅaJ��]¿��j�M��      �   >  x�e��N�@���)f�nZ0i��0Q��hLL3t$�4�)TW�,4!�U	�(�W��F��ʸ�9����[Ν{B��}����$�鯽Lb�S���vhĤ�
e�H�X �C4�h�hH(b!��$�D$a�����RFb�q�e�̈́�d�\r���a]�P�֪�J�Vv��QS��2�j�Ɛ�ְ�j�ZoԳ��;�Xj���c���L�j�uim�LM0,��.R/X�j15H���u�_c{6����t0Q3XbX�Q�@�ŝ�jj���e"?�A�������u��6O�{��~q�x:l�p�r�<�FM"Y�t�Zw�eY?Xb�6         �  x����n�@���Sx���:q��B4)P)�!!c�/��q=�8�Ѫ���x�0�J���q�Hl�3���6��Ҙx^�Lꓘ��N�7t��g)q#'��Z�I���>��Hzq�r�oU���=Ѵ9�"G���,)��K�Z�i���t�^�Եl�U�PVWPj�%[�Y�®��B�{(��>���aEuU�(����U��� l�/h����RO�v,�Gآ��!p�?�~��G�l�Ģ�_P��߻Q<ԃ6��;u�O��:0W"4s+b�M��O�h�V�/&�0P��Ζ�����A���^|��x:�-�O��֌m'�a��Q�0�Y/I��2�����'uJ�#��?Ȼ�i�V��/���?�����^��Dׂ���x}n��y0XO\g�Nr�X���q�ۋ���`���F��3��Vm4� �      �   �  x��SKoQ]�bV]9̃�@bjE�>bj�6&��Z�"� �����	*.\�S��d,���G��Ҋ��.�q��9��>��4�E�|ѤrEW�q$�0t�K��T�T�$O��rzG�0�EC�y�WE�����R�D��e���a�GD�8��R�*ΐ|��<�s$6dG��	�:�ղ3���ݝ|&�w��l��+UK�l���wtӲ��#�^�����X�%�@ӡ��Ă���C�D[�o0���F>��0*�33mmJ�v��0,��dO���?�4FS�cK���PShr�;�������:	���5s��;3f���d���d�ҡK3����}��ݞ_\7�Y��)��d8�*�B��H��a����WI��[8�I���c���h�',�A�D�D�c.$j��m��d�Cc��F�3�J�=v�El�k��'htc��ct��qӎ��pظ�:T���J�Ƚb7jZ�x��qMm����\%�܌����V�����F5�3R�_�j���Rq.T�6�[�������I���8���&��%�Nـ�_g❐v���Ҭ�ZMV�|y{��<�|b���e��mr����#w;��P�0��M��O?XD��������Z[����{���tR���B=OﬄL'e[/�&���Z&m<*$O��@��ʎ       �   �   x�e��n�0  �sy��Z�2Z�$
��L�@6��Z�"*�~&�.[�=��	bߏ� �B���_��K�P�%0�6117��v:�ٓ����r�6������k���_0J��"+�D��^�h��=@l@��=B=�.v�9l�Ơ�~��nZ�/����$�)Ϫ���^��M�f�����rS��t�苻���J� _���R2���C<��E��� �Y�����'�Q>     