PGDMP  (                    |            arkana_store_db    16.3    16.3 %    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    36497    arkana_store_db    DATABASE     �   CREATE DATABASE arkana_store_db WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Spanish_Mexico.1252';
    DROP DATABASE arkana_store_db;
                postgres    false            �            1259    36520 
   cart_items    TABLE     �   CREATE TABLE public.cart_items (
    id integer NOT NULL,
    user_id integer,
    product_id integer,
    cantidad integer NOT NULL
);
    DROP TABLE public.cart_items;
       public         heap    postgres    false            �            1259    36519    cart_items_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cart_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 (   DROP SEQUENCE public.cart_items_id_seq;
       public          postgres    false    220            �           0    0    cart_items_id_seq    SEQUENCE OWNED BY     G   ALTER SEQUENCE public.cart_items_id_seq OWNED BY public.cart_items.id;
          public          postgres    false    219            �            1259    36510    products    TABLE       CREATE TABLE public.products (
    id integer NOT NULL,
    nombre character varying(100) NOT NULL,
    descripcion text,
    precio numeric(10,2) NOT NULL,
    imagen_url text,
    categoria character varying(50),
    cantidad_disponible integer DEFAULT 0 NOT NULL
);
    DROP TABLE public.products;
       public         heap    postgres    false            �            1259    36509    products_id_seq    SEQUENCE     �   CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.products_id_seq;
       public          postgres    false    218            �           0    0    products_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;
          public          postgres    false    217            �            1259    36537    purchase_history    TABLE     �   CREATE TABLE public.purchase_history (
    id integer NOT NULL,
    user_id integer,
    fecha_compra timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    total numeric(10,2) NOT NULL
);
 $   DROP TABLE public.purchase_history;
       public         heap    postgres    false            �            1259    36536    purchase_history_id_seq    SEQUENCE     �   CREATE SEQUENCE public.purchase_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.purchase_history_id_seq;
       public          postgres    false    222            �           0    0    purchase_history_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.purchase_history_id_seq OWNED BY public.purchase_history.id;
          public          postgres    false    221            �            1259    36499    users    TABLE     �   CREATE TABLE public.users (
    id integer NOT NULL,
    nombre_usuario character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    contrasena character varying(255) NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    36498    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    215            ,           2604    36523    cart_items id    DEFAULT     n   ALTER TABLE ONLY public.cart_items ALTER COLUMN id SET DEFAULT nextval('public.cart_items_id_seq'::regclass);
 <   ALTER TABLE public.cart_items ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            *           2604    36513    products id    DEFAULT     j   ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);
 :   ALTER TABLE public.products ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            -           2604    36540    purchase_history id    DEFAULT     z   ALTER TABLE ONLY public.purchase_history ALTER COLUMN id SET DEFAULT nextval('public.purchase_history_id_seq'::regclass);
 B   ALTER TABLE public.purchase_history ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    221    222    222            )           2604    36502    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    215    216    216            �          0    36520 
   cart_items 
   TABLE DATA           G   COPY public.cart_items (id, user_id, product_id, cantidad) FROM stdin;
    public          postgres    false    220   �)       �          0    36510    products 
   TABLE DATA           o   COPY public.products (id, nombre, descripcion, precio, imagen_url, categoria, cantidad_disponible) FROM stdin;
    public          postgres    false    218   ,*       �          0    36537    purchase_history 
   TABLE DATA           L   COPY public.purchase_history (id, user_id, fecha_compra, total) FROM stdin;
    public          postgres    false    222   C.       �          0    36499    users 
   TABLE DATA           F   COPY public.users (id, nombre_usuario, email, contrasena) FROM stdin;
    public          postgres    false    216   �.       �           0    0    cart_items_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.cart_items_id_seq', 3, true);
          public          postgres    false    219            �           0    0    products_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.products_id_seq', 15, true);
          public          postgres    false    217            �           0    0    purchase_history_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.purchase_history_id_seq', 3, true);
          public          postgres    false    221            �           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 3, true);
          public          postgres    false    215            8           2606    36525    cart_items cart_items_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_pkey PRIMARY KEY (id);
 D   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_pkey;
       public            postgres    false    220            6           2606    36518    products products_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.products DROP CONSTRAINT products_pkey;
       public            postgres    false    218            :           2606    36543 &   purchase_history purchase_history_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.purchase_history
    ADD CONSTRAINT purchase_history_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.purchase_history DROP CONSTRAINT purchase_history_pkey;
       public            postgres    false    222            0           2606    36508    users users_email_key 
   CONSTRAINT     Q   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);
 ?   ALTER TABLE ONLY public.users DROP CONSTRAINT users_email_key;
       public            postgres    false    216            2           2606    36506    users users_nombre_usuario_key 
   CONSTRAINT     c   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_nombre_usuario_key UNIQUE (nombre_usuario);
 H   ALTER TABLE ONLY public.users DROP CONSTRAINT users_nombre_usuario_key;
       public            postgres    false    216            4           2606    36504    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    216            ;           2606    36531 %   cart_items cart_items_product_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_product_id_fkey FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;
 O   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_product_id_fkey;
       public          postgres    false    218    220    4662            <           2606    36526 "   cart_items cart_items_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cart_items
    ADD CONSTRAINT cart_items_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 L   ALTER TABLE ONLY public.cart_items DROP CONSTRAINT cart_items_user_id_fkey;
       public          postgres    false    216    4660    220            =           2606    36544 .   purchase_history purchase_history_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.purchase_history
    ADD CONSTRAINT purchase_history_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;
 X   ALTER TABLE ONLY public.purchase_history DROP CONSTRAINT purchase_history_user_id_fkey;
       public          postgres    false    216    222    4660            �   "   x�3�4B#.#N#NcNC.c i�i����� 4Ns      �     x�}UMs�8=�_��s���	�|$�LmRs�aDdɫ2ɿ������?�-;�0��@a�e����2��钞O_��V�4�qsm�H���9���M���=��s��tx(�ܛ6�š=^�/&��U��Sə3�_J0 I��LH	�
n^��ɵ��*ps��`�J09Xj�Zq�<�u��iCf���.GU����[��꒡7�y<�ɴz�[�2P�K`��LƋ9fj*���m�J4dH�6B[҉Z)�{�?�ai���iz	kȘ�#7�ʰ��q����ـ�5�TY��{��󻪳`uQԊ�	�r�J<��ۜ��8�O$�0�b�6I��G���f��F��[��s��[һ�^ ����=���!Ut�����$�Km��~�	Kͬw�;�	��R�:�N��.h(��h�����Y������(v*Uh74L��y����L`h@N��������9��v!Q��P�5`�1�B�P� ���^Q{��m+o]���@����z׵�Gd���2�OG4+���ȗn�.��R���Z9�рhx(��U~C���\)C��ڐn�N��|���M�]Vx.��F� ��̸�+z�&������
��Ö?�ZdA��=�fDi'�u�6�Y.���&Q�]>v�V�GT�%����l�t�*�Y��|j����_vk0��B�"�&�ic��j=���r8�Ē�Hr�~qt��g���X�
���됉fK!+�d8_���t��aB�	�*��r_���+�(e5���(pD94l��n�#������ُ�}\1� �b��Y�ě��I�z#����6@ 6-}���g��L���0~
5��|�_��+�d�ZXX�������om!����d=)�r���WB��,^�u�lɕ�0�¦�����n+M��_3K�MHcv<r��>�I�:"�V�4��z�_�ڛu�T�� �f�A�^�᥍��p�'����V�{u�p���ɔ���}��Y�.���{�B���[�����      �   E   x�E˱�0������'�Y��E��t��ŤM�`�k��ΕL�6��9��}����. %��      �   W   x�3�LL��̃��Eىy��%�E�z���QC#c.#����Ģ�|C8�!=713�� ���ʄ�&Wo����<���d\� 0�(�     