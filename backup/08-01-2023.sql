PGDMP     ;    *                 {            finance    12.9    15.1 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    659029    finance    DATABASE     {   CREATE DATABASE finance WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE finance;
                postgres    false            	            2615    660203    controls    SCHEMA        CREATE SCHEMA controls;
    DROP SCHEMA controls;
                postgres    false            �           0    0    SCHEMA controls    COMMENT     I   COMMENT ON SCHEMA controls IS 'Список пользователей';
                   postgres    false    9                        2615    660366    country    SCHEMA        CREATE SCHEMA country;
    DROP SCHEMA country;
                postgres    false                        2615    659798    guide    SCHEMA        CREATE SCHEMA guide;
    DROP SCHEMA guide;
                postgres    false            �           0    0    SCHEMA guide    COMMENT     5   COMMENT ON SCHEMA guide IS 'Справочники';
                   postgres    false    8            
            2615    660234    prod    SCHEMA        CREATE SCHEMA prod;
    DROP SCHEMA prod;
                postgres    false            �           0    0    SCHEMA prod    COMMENT     C   COMMENT ON SCHEMA prod IS 'Финансовые продукты';
                   postgres    false    10                        2615    2200    public    SCHEMA     2   -- *not* creating schema, since initdb creates it
 2   -- *not* dropping schema, since initdb creates it
                postgres    false            �           0    0 
   SCHEMA public    ACL     Q   REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;
                   postgres    false    6            �            1255    660217    update_changetimestamp_column()    FUNCTION     �   CREATE FUNCTION controls.update_changetimestamp_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.update_date = now();
   RETURN NEW;
END;
$$;
 8   DROP FUNCTION controls.update_changetimestamp_column();
       controls          postgres    false    9            �            1255    660269    update_changetimestamp_column()    FUNCTION     �   CREATE FUNCTION prod.update_changetimestamp_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
   NEW.update_date = now();
   RETURN NEW;
END;
$$;
 4   DROP FUNCTION prod.update_changetimestamp_column();
       prod          postgres    false    10            �            1259    660219    access    TABLE     �   CREATE TABLE controls.access (
    id integer NOT NULL,
    user_id integer NOT NULL,
    access_id integer NOT NULL,
    state boolean
);
    DROP TABLE controls.access;
       controls         heap    postgres    false    9            �           0    0    TABLE access    COMMENT     \   COMMENT ON TABLE controls.access IS 'Права доступа пользователей';
          controls          postgres    false    227            �           0    0    COLUMN access.id    COMMENT     w   COMMENT ON COLUMN controls.access.id IS 'Идентификатор пара доступа пользователя';
          controls          postgres    false    227            �           0    0    COLUMN access.user_id    COMMENT     d   COMMENT ON COLUMN controls.access.user_id IS 'Идентификатор пользоватлея';
          controls          postgres    false    227            �           0    0    COLUMN access.access_id    COMMENT     x   COMMENT ON COLUMN controls.access.access_id IS 'Идентификатор значения права доступа';
          controls          postgres    false    227            �           0    0    COLUMN access.state    COMMENT     t   COMMENT ON COLUMN controls.access.state IS 'Состояние права доступа пользователя';
          controls          postgres    false    227            �            1259    660208    users    TABLE        CREATE TABLE controls.users (
    id integer NOT NULL,
    name character varying NOT NULL,
    password character varying NOT NULL,
    create_dt timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_dt timestamp without time zone
);
    DROP TABLE controls.users;
       controls         heap    postgres    false    9            �           0    0    COLUMN users.id    COMMENT     ^   COMMENT ON COLUMN controls.users.id IS 'Идентификатор пользователя';
          controls          postgres    false    226            �           0    0    COLUMN users.name    COMMENT     L   COMMENT ON COLUMN controls.users.name IS 'Имя пользователя';
          controls          postgres    false    226            �           0    0    COLUMN users.password    COMMENT     V   COMMENT ON COLUMN controls.users.password IS 'Пароль пользователя';
          controls          postgres    false    226            �           0    0    COLUMN users.create_dt    COMMENT     K   COMMENT ON COLUMN controls.users.create_dt IS 'Дата создания';
          controls          postgres    false    226            �           0    0    COLUMN users.update_dt    COMMENT     \   COMMENT ON COLUMN controls.users.update_dt IS 'Дата обновления записи';
          controls          postgres    false    226            �            1259    660204    users_id_seq    SEQUENCE        CREATE SEQUENCE controls.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 %   DROP SEQUENCE controls.users_id_seq;
       controls          postgres    false    9            �            1259    660206 
   users_id_seq1    SEQUENCE     �   ALTER TABLE controls.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME controls.users_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            controls          postgres    false    226    9            �            1259    660383    cities    TABLE     �  CREATE TABLE country.cities (
    id integer NOT NULL,
    region_id integer NOT NULL,
    code character varying NOT NULL,
    name character varying NOT NULL,
    short_type character varying NOT NULL,
    url character varying NOT NULL,
    im character varying NOT NULL,
    rod character varying NOT NULL,
    dat character varying NOT NULL,
    vin character varying NOT NULL,
    tvor character varying NOT NULL,
    predl character varying NOT NULL
);
    DROP TABLE country.cities;
       country         heap    postgres    false    11            �            1259    660367 
   cities_id_seq    SEQUENCE        CREATE SEQUENCE country.cities_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 %   DROP SEQUENCE country.cities_id_seq;
       country          postgres    false    11            �            1259    660381    cities_id_seq1    SEQUENCE     �   ALTER TABLE country.cities ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME country.cities_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            country          postgres    false    11    242            �            1259    660373    regions    TABLE     �   CREATE TABLE country.regions (
    id integer NOT NULL,
    code character varying NOT NULL,
    name character varying NOT NULL,
    type character varying NOT NULL,
    url character varying NOT NULL,
    declination character varying NOT NULL
);
    DROP TABLE country.regions;
       country         heap    postgres    false    11            �            1259    660369    regions_id_seq    SEQUENCE     �   CREATE SEQUENCE country.regions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 &   DROP SEQUENCE country.regions_id_seq;
       country          postgres    false    11            �            1259    660371    regions_id_seq1    SEQUENCE     �   ALTER TABLE country.regions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME country.regions_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            country          postgres    false    240    11            �            1259    659813    access    TABLE     \   CREATE TABLE guide.access (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE guide.access;
       guide         heap    postgres    false    8            �           0    0    TABLE access    COMMENT     I   COMMENT ON TABLE guide.access IS 'Список прав доступа';
          guide          postgres    false    213            �           0    0    COLUMN access.id    COMMENT     [   COMMENT ON COLUMN guide.access.id IS 'Идентификатор прав доступа';
          guide          postgres    false    213            �           0    0    COLUMN access.name    COMMENT     [   COMMENT ON COLUMN guide.access.name IS 'Наименование прав доступа';
          guide          postgres    false    213            �            1259    659799 
   access_id_seq    SEQUENCE     }   CREATE SEQUENCE guide.access_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 #   DROP SEQUENCE guide.access_id_seq;
       guide          postgres    false    8            �            1259    659811    access_id_seq1    SEQUENCE     �   ALTER TABLE guide.access ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME guide.access_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            guide          postgres    false    213    8            �            1259    659823 
   categories    TABLE     �   CREATE TABLE guide.categories (
    id integer NOT NULL,
    name character varying NOT NULL,
    description character varying
);
    DROP TABLE guide.categories;
       guide         heap    postgres    false    8            �           0    0    TABLE categories    COMMENT     H   COMMENT ON TABLE guide.categories IS 'Категория оффера';
          guide          postgres    false    215            �           0    0    COLUMN categories.id    COMMENT     G   COMMENT ON COLUMN guide.categories.id IS 'Идентификатор';
          guide          postgres    false    215            �           0    0    COLUMN categories.name    COMMENT     g   COMMENT ON COLUMN guide.categories.name IS 'Наименование категории оффера';
          guide          postgres    false    215            �           0    0    COLUMN categories.description    COMMENT     Y   COMMENT ON COLUMN guide.categories.description IS 'Описание категории';
          guide          postgres    false    215            �            1259    659801    categories_id_seq    SEQUENCE     �   CREATE SEQUENCE guide.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 '   DROP SEQUENCE guide.categories_id_seq;
       guide          postgres    false    8            �            1259    659821    categories_id_seq1    SEQUENCE     �   ALTER TABLE guide.categories ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME guide.categories_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            guide          postgres    false    215    8            �            1259    659833    cpa    TABLE     Y   CREATE TABLE guide.cpa (
    id integer NOT NULL,
    name character varying NOT NULL
);
    DROP TABLE guide.cpa;
       guide         heap    postgres    false    8            �           0    0 	   TABLE cpa    COMMENT     K   COMMENT ON TABLE guide.cpa IS 'Партнерская программа';
          guide          postgres    false    217            �           0    0 
   COLUMN cpa.id    COMMENT     j   COMMENT ON COLUMN guide.cpa.id IS 'Идентификатор партнерской программы';
          guide          postgres    false    217            �           0    0    COLUMN cpa.name    COMMENT     j   COMMENT ON COLUMN guide.cpa.name IS 'Наименование партнерской программы';
          guide          postgres    false    217            �            1259    659803 
   cpa_id_seq    SEQUENCE     z   CREATE SEQUENCE guide.cpa_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
     DROP SEQUENCE guide.cpa_id_seq;
       guide          postgres    false    8            �            1259    659831    cpa_id_seq1    SEQUENCE     �   ALTER TABLE guide.cpa ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME guide.cpa_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            guide          postgres    false    217    8            �            1259    659843    method_get_money    TABLE     ]   CREATE TABLE guide.method_get_money (
    id integer NOT NULL,
    name character varying
);
 #   DROP TABLE guide.method_get_money;
       guide         heap    postgres    false    8            �           0    0    COLUMN method_get_money.id    COMMENT     z   COMMENT ON COLUMN guide.method_get_money.id IS 'Идентификатор способа получения денег';
          guide          postgres    false    219            �           0    0    COLUMN method_get_money.name    COMMENT     z   COMMENT ON COLUMN guide.method_get_money.name IS 'Наименование способо получения денег';
          guide          postgres    false    219            �            1259    659805    method_get_money_id_seq    SEQUENCE     �   CREATE SEQUENCE guide.method_get_money_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 -   DROP SEQUENCE guide.method_get_money_id_seq;
       guide          postgres    false    8            �            1259    659841    method_get_money_id_seq1    SEQUENCE     �   ALTER TABLE guide.method_get_money ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME guide.method_get_money_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            guide          postgres    false    8    219            �            1259    659853 	   type_docs    TABLE     V   CREATE TABLE guide.type_docs (
    id integer NOT NULL,
    name character varying
);
    DROP TABLE guide.type_docs;
       guide         heap    postgres    false    8            �           0    0    TABLE type_docs    COMMENT     E   COMMENT ON TABLE guide.type_docs IS 'Типы документов';
          guide          postgres    false    221            �           0    0    COLUMN type_docs.id    COMMENT     b   COMMENT ON COLUMN guide.type_docs.id IS 'Идентификатор типа документа';
          guide          postgres    false    221            �           0    0    COLUMN type_docs.name    COMMENT     b   COMMENT ON COLUMN guide.type_docs.name IS 'Наименование типа документа';
          guide          postgres    false    221            �            1259    659807    type_docs_id_seq    SEQUENCE     �   CREATE SEQUENCE guide.type_docs_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 &   DROP SEQUENCE guide.type_docs_id_seq;
       guide          postgres    false    8            �            1259    659851    type_docs_id_seq1    SEQUENCE     �   ALTER TABLE guide.type_docs ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME guide.type_docs_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            guide          postgres    false    8    221            �            1259    659809    type_interval_id_seq    SEQUENCE     �   CREATE SEQUENCE guide.type_interval_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 *   DROP SEQUENCE guide.type_interval_id_seq;
       guide          postgres    false    8            �            1259    659863    types_period    TABLE     v   CREATE TABLE guide.types_period (
    id integer NOT NULL,
    name character varying,
    mnosh character varying
);
    DROP TABLE guide.types_period;
       guide         heap    postgres    false    8            �           0    0    TABLE types_period    COMMENT     D   COMMENT ON TABLE guide.types_period IS 'Виды периодов';
          guide          postgres    false    223            �           0    0    COLUMN types_period.id    COMMENT     a   COMMENT ON COLUMN guide.types_period.id IS 'Идентификатор типа периода';
          guide          postgres    false    223            �           0    0    COLUMN types_period.name    COMMENT     a   COMMENT ON COLUMN guide.types_period.name IS 'Наименование типа периода';
          guide          postgres    false    223            �           0    0    COLUMN types_period.mnosh    COMMENT     X   COMMENT ON COLUMN guide.types_period.mnosh IS 'Множественное число ';
          guide          postgres    false    223            �            1259    659861    types_period_id_seq    SEQUENCE     �   ALTER TABLE guide.types_period ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME guide.types_period_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            guide          postgres    false    8    223            �            1259    660243    baners    TABLE     z   CREATE TABLE prod.baners (
    id integer NOT NULL,
    id_offer integer NOT NULL,
    path character varying NOT NULL
);
    DROP TABLE prod.baners;
       prod         heap    postgres    false    10            �           0    0    TABLE baners    COMMENT     g   COMMENT ON TABLE prod.baners IS 'Наименование изображений для оффера';
          prod          postgres    false    232            �           0    0    COLUMN baners.id    COMMENT     O   COMMENT ON COLUMN prod.baners.id IS 'Идентификатор банера';
          prod          postgres    false    232            �           0    0    COLUMN baners.id_offer    COMMENT     U   COMMENT ON COLUMN prod.baners.id_offer IS 'Идентификатор оффера';
          prod          postgres    false    232            �           0    0    COLUMN baners.path    COMMENT     L   COMMENT ON COLUMN prod.baners.path IS 'Путь к изображению';
          prod          postgres    false    232            �            1259    660235 
   baners_id_seq    SEQUENCE     |   CREATE SEQUENCE prod.baners_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 "   DROP SEQUENCE prod.baners_id_seq;
       prod          postgres    false    10            �            1259    660241    baners_id_seq1    SEQUENCE     �   ALTER TABLE prod.baners ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME prod.baners_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            prod          postgres    false    232    10            �            1259    660253    link_get_money    TABLE     �   CREATE TABLE prod.link_get_money (
    id integer NOT NULL,
    id_offer integer NOT NULL,
    id_method_get_money integer NOT NULL
);
     DROP TABLE prod.link_get_money;
       prod         heap    postgres    false    10            �           0    0    TABLE link_get_money    COMMENT     V   COMMENT ON TABLE prod.link_get_money IS 'Способ получения денег';
          prod          postgres    false    234            �           0    0    COLUMN link_get_money.id    COMMENT     V   COMMENT ON COLUMN prod.link_get_money.id IS 'Идентификатор  связи';
          prod          postgres    false    234            �           0    0    COLUMN link_get_money.id_offer    COMMENT     ]   COMMENT ON COLUMN prod.link_get_money.id_offer IS 'Идентификатор оффера';
          prod          postgres    false    234            �           0    0 )   COLUMN link_get_money.id_method_get_money    COMMENT     �   COMMENT ON COLUMN prod.link_get_money.id_method_get_money IS 'Идентификатор способа получения денег';
          prod          postgres    false    234            �            1259    660237    link_get_money_id_seq    SEQUENCE     �   CREATE SEQUENCE prod.link_get_money_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 *   DROP SEQUENCE prod.link_get_money_id_seq;
       prod          postgres    false    10            �            1259    660251    link_get_money_id_seq1    SEQUENCE     �   ALTER TABLE prod.link_get_money ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME prod.link_get_money_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            prod          postgres    false    234    10            �            1259    660260    offers    TABLE     �  CREATE TABLE prod.offers (
    id integer NOT NULL,
    name character varying NOT NULL,
    id_category integer,
    id_cpa integer,
    description text,
    short_description character varying,
    sum_start integer,
    sum_end integer,
    free_period integer,
    type_free_period integer,
    period_min integer,
    type_period_min integer,
    period_max integer,
    type_period_max integer,
    review_time integer,
    type_review_time integer,
    age_start character varying,
    age_end character varying,
    percent_min real,
    type_percent_min integer,
    percent_max real,
    type_percent_max integer,
    profit character varying,
    desription_profit character varying,
    url_offer character varying,
    site character varying,
    cr real,
    ar real,
    epc real,
    create_dt date DEFAULT CURRENT_TIMESTAMP NOT NULL,
    update_dt date,
    user_create integer NOT NULL,
    user_update integer
);
    DROP TABLE prod.offers;
       prod         heap    postgres    false    10            �           0    0    TABLE offers    COMMENT     0   COMMENT ON TABLE prod.offers IS 'Офферы';
          prod          postgres    false    236            �           0    0    COLUMN offers.id    COMMENT     B   COMMENT ON COLUMN prod.offers.id IS 'Идентификатор';
          prod          postgres    false    236            �           0    0    COLUMN offers.name    COMMENT     O   COMMENT ON COLUMN prod.offers.name IS 'Наименование оффера';
          prod          postgres    false    236            �           0    0    COLUMN offers.id_category    COMMENT     ^   COMMENT ON COLUMN prod.offers.id_category IS 'Идентификатор категории';
          prod          postgres    false    236            �           0    0    COLUMN offers.id_cpa    COMMENT     p   COMMENT ON COLUMN prod.offers.id_cpa IS 'Идентификатор партнерской программы';
          prod          postgres    false    236            �           0    0    COLUMN offers.description    COMMENT     N   COMMENT ON COLUMN prod.offers.description IS 'Описание оффера';
          prod          postgres    false    236            �           0    0    COLUMN offers.short_description    COMMENT     e   COMMENT ON COLUMN prod.offers.short_description IS 'Короткое описание оффера';
          prod          postgres    false    236            �           0    0    COLUMN offers.sum_start    COMMENT     P   COMMENT ON COLUMN prod.offers.sum_start IS 'Минимальная сумма';
          prod          postgres    false    236            �           0    0    COLUMN offers.sum_end    COMMENT     P   COMMENT ON COLUMN prod.offers.sum_end IS 'Максимальная сумма';
          prod          postgres    false    236            �           0    0    COLUMN offers.free_period    COMMENT     X   COMMENT ON COLUMN prod.offers.free_period IS 'Беспроцентный период';
          prod          postgres    false    236            �           0    0    COLUMN offers.type_free_period    COMMENT     h   COMMENT ON COLUMN prod.offers.type_free_period IS 'Тип беспроцентного периода';
          prod          postgres    false    236            �           0    0    COLUMN offers.period_min    COMMENT     O   COMMENT ON COLUMN prod.offers.period_min IS 'Минимальный срок';
          prod          postgres    false    236            �           0    0    COLUMN offers.type_period_min    COMMENT     _   COMMENT ON COLUMN prod.offers.type_period_min IS 'Тип минимального срока';
          prod          postgres    false    236            �           0    0    COLUMN offers.period_max    COMMENT     Q   COMMENT ON COLUMN prod.offers.period_max IS 'Максимальный срок';
          prod          postgres    false    236            �           0    0    COLUMN offers.type_period_max    COMMENT     a   COMMENT ON COLUMN prod.offers.type_period_max IS 'Тип максимального срока';
          prod          postgres    false    236            �           0    0    COLUMN offers.review_time    COMMENT     T   COMMENT ON COLUMN prod.offers.review_time IS 'Время рассмотрения';
          prod          postgres    false    236            �           0    0    COLUMN offers.type_review_time    COMMENT     d   COMMENT ON COLUMN prod.offers.type_review_time IS 'Тип времени рассмотрения';
          prod          postgres    false    236            �           0    0    COLUMN offers.age_start    COMMENT     T   COMMENT ON COLUMN prod.offers.age_start IS 'Минимальный возраст';
          prod          postgres    false    236                        0    0    COLUMN offers.age_end    COMMENT     T   COMMENT ON COLUMN prod.offers.age_end IS 'Максимальный возраст';
          prod          postgres    false    236                       0    0    COLUMN offers.percent_min    COMMENT     i   COMMENT ON COLUMN prod.offers.percent_min IS 'Минимальная процентная ставка';
          prod          postgres    false    236                       0    0    COLUMN offers.type_percent_min    COMMENT     u   COMMENT ON COLUMN prod.offers.type_percent_min IS 'Тип минимальной процентной ставки';
          prod          postgres    false    236                       0    0    COLUMN offers.percent_max    COMMENT     k   COMMENT ON COLUMN prod.offers.percent_max IS 'Максимальная процентная ставка';
          prod          postgres    false    236                       0    0    COLUMN offers.type_percent_max    COMMENT     w   COMMENT ON COLUMN prod.offers.type_percent_max IS 'Тип максимальной процентной ставки';
          prod          postgres    false    236                       0    0    COLUMN offers.profit    COMMENT     U   COMMENT ON COLUMN prod.offers.profit IS 'Размер вознаграждения';
          prod          postgres    false    236                       0    0    COLUMN offers.desription_profit    COMMENT     ~   COMMENT ON COLUMN prod.offers.desription_profit IS 'Описание для получения вознаграждения';
          prod          postgres    false    236                       0    0    COLUMN offers.url_offer    COMMENT     K   COMMENT ON COLUMN prod.offers.url_offer IS 'Ссылка на оффер';
          prod          postgres    false    236                       0    0    COLUMN offers.site    COMMENT     D   COMMENT ON COLUMN prod.offers.site IS 'Ссылка на сайт';
          prod          postgres    false    236            	           0    0    COLUMN offers.cr    COMMENT     �   COMMENT ON COLUMN prod.offers.cr IS 'Количество уникальных конверсий / Количество уникальных кликов на баннеры';
          prod          postgres    false    236            
           0    0    COLUMN offers.ar    COMMENT     I   COMMENT ON COLUMN prod.offers.ar IS 'Процент одобрения';
          prod          postgres    false    236                       0    0    COLUMN offers.epc    COMMENT     �   COMMENT ON COLUMN prod.offers.epc IS 'Средний заработок в пересчете на один уникальный клик';
          prod          postgres    false    236                       0    0    COLUMN offers.create_dt    COMMENT     H   COMMENT ON COLUMN prod.offers.create_dt IS 'Дата создания';
          prod          postgres    false    236            
           0    0    COLUMN offers.update_dt    COMMENT     a   COMMENT ON COLUMN prod.offers.update_dt IS 'Дата последнего обновления';
          prod          postgres    false    236                       0    0    COLUMN offers.user_create    COMMENT     i   COMMENT ON COLUMN prod.offers.user_create IS 'Пользователь создавший запись';
          prod          postgres    false    236                       0    0    COLUMN offers.user_update    COMMENT     k   COMMENT ON COLUMN prod.offers.user_update IS 'Пользователь обновивший запись';
          prod          postgres    false    236            �            1259    660239 
   offers_id_seq    SEQUENCE     |   CREATE SEQUENCE prod.offers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    MAXVALUE 2147483647
    CACHE 1;
 "   DROP SEQUENCE prod.offers_id_seq;
       prod          postgres    false    10            �            1259    660258    offers_id_seq1    SEQUENCE     �   ALTER TABLE prod.offers ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME prod.offers_id_seq1
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            prod          postgres    false    236    10            �          0    660219    access 
   TABLE DATA           A   COPY controls.access (id, user_id, access_id, state) FROM stdin;
    controls          postgres    false    227   0�       �          0    660208    users 
   TABLE DATA           K   COPY controls.users (id, name, password, create_dt, update_dt) FROM stdin;
    controls          postgres    false    226   M�       �          0    660383    cities 
   TABLE DATA           m   COPY country.cities (id, region_id, code, name, short_type, url, im, rod, dat, vin, tvor, predl) FROM stdin;
    country          postgres    false    242   j�       �          0    660373    regions 
   TABLE DATA           J   COPY country.regions (id, code, name, type, url, declination) FROM stdin;
    country          postgres    false    240   �k      �          0    659813    access 
   TABLE DATA           )   COPY guide.access (id, name) FROM stdin;
    guide          postgres    false    213   �t      �          0    659823 
   categories 
   TABLE DATA           :   COPY guide.categories (id, name, description) FROM stdin;
    guide          postgres    false    215   �t      �          0    659833    cpa 
   TABLE DATA           &   COPY guide.cpa (id, name) FROM stdin;
    guide          postgres    false    217   u      �          0    659843    method_get_money 
   TABLE DATA           3   COPY guide.method_get_money (id, name) FROM stdin;
    guide          postgres    false    219   0u      �          0    659853 	   type_docs 
   TABLE DATA           ,   COPY guide.type_docs (id, name) FROM stdin;
    guide          postgres    false    221   Mu      �          0    659863    types_period 
   TABLE DATA           6   COPY guide.types_period (id, name, mnosh) FROM stdin;
    guide          postgres    false    223   ju      �          0    660243    baners 
   TABLE DATA           2   COPY prod.baners (id, id_offer, path) FROM stdin;
    prod          postgres    false    232   �u      �          0    660253    link_get_money 
   TABLE DATA           I   COPY prod.link_get_money (id, id_offer, id_method_get_money) FROM stdin;
    prod          postgres    false    234   �u      �          0    660260    offers 
   TABLE DATA           �  COPY prod.offers (id, name, id_category, id_cpa, description, short_description, sum_start, sum_end, free_period, type_free_period, period_min, type_period_min, period_max, type_period_max, review_time, type_review_time, age_start, age_end, percent_min, type_percent_min, percent_max, type_percent_max, profit, desription_profit, url_offer, site, cr, ar, epc, create_dt, update_dt, user_create, user_update) FROM stdin;
    prod          postgres    false    236   �u                 0    0    users_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('controls.users_id_seq', 1, false);
          controls          postgres    false    224                       0    0 
   users_id_seq1    SEQUENCE SET     >   SELECT pg_catalog.setval('controls.users_id_seq1', 1, false);
          controls          postgres    false    225                       0    0 
   cities_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('country.cities_id_seq', 1, false);
          country          postgres    false    237                       0    0    cities_id_seq1    SEQUENCE SET     @   SELECT pg_catalog.setval('country.cities_id_seq1', 1161, true);
          country          postgres    false    241                       0    0    regions_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('country.regions_id_seq', 1, false);
          country          postgres    false    238                       0    0    regions_id_seq1    SEQUENCE SET     ?   SELECT pg_catalog.setval('country.regions_id_seq1', 85, true);
          country          postgres    false    239                       0    0 
   access_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('guide.access_id_seq', 1, false);
          guide          postgres    false    206                       0    0    access_id_seq1    SEQUENCE SET     <   SELECT pg_catalog.setval('guide.access_id_seq1', 1, false);
          guide          postgres    false    212                       0    0    categories_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('guide.categories_id_seq', 1, false);
          guide          postgres    false    207                       0    0    categories_id_seq1    SEQUENCE SET     @   SELECT pg_catalog.setval('guide.categories_id_seq1', 1, false);
          guide          postgres    false    214                       0    0 
   cpa_id_seq    SEQUENCE SET     8   SELECT pg_catalog.setval('guide.cpa_id_seq', 1, false);
          guide          postgres    false    208                       0    0    cpa_id_seq1    SEQUENCE SET     9   SELECT pg_catalog.setval('guide.cpa_id_seq1', 1, false);
          guide          postgres    false    216                       0    0    method_get_money_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('guide.method_get_money_id_seq', 1, false);
          guide          postgres    false    209                       0    0    method_get_money_id_seq1    SEQUENCE SET     F   SELECT pg_catalog.setval('guide.method_get_money_id_seq1', 1, false);
          guide          postgres    false    218                       0    0    type_docs_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('guide.type_docs_id_seq', 1, false);
          guide          postgres    false    210                       0    0    type_docs_id_seq1    SEQUENCE SET     ?   SELECT pg_catalog.setval('guide.type_docs_id_seq1', 1, false);
          guide          postgres    false    220                        0    0    type_interval_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('guide.type_interval_id_seq', 1, false);
          guide          postgres    false    211            !           0    0    types_period_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('guide.types_period_id_seq', 1, false);
          guide          postgres    false    222            "           0    0 
   baners_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('prod.baners_id_seq', 1, false);
          prod          postgres    false    228            #           0    0    baners_id_seq1    SEQUENCE SET     ;   SELECT pg_catalog.setval('prod.baners_id_seq1', 1, false);
          prod          postgres    false    231            $           0    0    link_get_money_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('prod.link_get_money_id_seq', 1, false);
          prod          postgres    false    229            %           0    0    link_get_money_id_seq1    SEQUENCE SET     C   SELECT pg_catalog.setval('prod.link_get_money_id_seq1', 1, false);
          prod          postgres    false    233            &           0    0 
   offers_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('prod.offers_id_seq', 1, false);
          prod          postgres    false    230            '           0    0    offers_id_seq1    SEQUENCE SET     ;   SELECT pg_catalog.setval('prod.offers_id_seq1', 1, false);
          prod          postgres    false    235            �
           2606    660223    access access_pk 
   CONSTRAINT     P   ALTER TABLE ONLY controls.access
    ADD CONSTRAINT access_pk PRIMARY KEY (id);
 <   ALTER TABLE ONLY controls.access DROP CONSTRAINT access_pk;
       controls            postgres    false    227            �
           2606    660216    users users_pk 
   CONSTRAINT     N   ALTER TABLE ONLY controls.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
 :   ALTER TABLE ONLY controls.users DROP CONSTRAINT users_pk;
       controls            postgres    false    226            	           2606    660390    cities cities_pk 
   CONSTRAINT     O   ALTER TABLE ONLY country.cities
    ADD CONSTRAINT cities_pk PRIMARY KEY (id);
 ;   ALTER TABLE ONLY country.cities DROP CONSTRAINT cities_pk;
       country            postgres    false    242                       2606    660380    regions regions_pk 
   CONSTRAINT     Q   ALTER TABLE ONLY country.regions
    ADD CONSTRAINT regions_pk PRIMARY KEY (id);
 =   ALTER TABLE ONLY country.regions DROP CONSTRAINT regions_pk;
       country            postgres    false    240            �
           2606    659820    access access_pk 
   CONSTRAINT     M   ALTER TABLE ONLY guide.access
    ADD CONSTRAINT access_pk PRIMARY KEY (id);
 9   ALTER TABLE ONLY guide.access DROP CONSTRAINT access_pk;
       guide            postgres    false    213            �
           2606    659830    categories categories_pk 
   CONSTRAINT     U   ALTER TABLE ONLY guide.categories
    ADD CONSTRAINT categories_pk PRIMARY KEY (id);
 A   ALTER TABLE ONLY guide.categories DROP CONSTRAINT categories_pk;
       guide            postgres    false    215            �
           2606    659840 
   cpa cpa_pk 
   CONSTRAINT     G   ALTER TABLE ONLY guide.cpa
    ADD CONSTRAINT cpa_pk PRIMARY KEY (id);
 3   ALTER TABLE ONLY guide.cpa DROP CONSTRAINT cpa_pk;
       guide            postgres    false    217            �
           2606    659850 $   method_get_money method_get_money_pk 
   CONSTRAINT     a   ALTER TABLE ONLY guide.method_get_money
    ADD CONSTRAINT method_get_money_pk PRIMARY KEY (id);
 M   ALTER TABLE ONLY guide.method_get_money DROP CONSTRAINT method_get_money_pk;
       guide            postgres    false    219            �
           2606    659860    type_docs type_docs_pk 
   CONSTRAINT     S   ALTER TABLE ONLY guide.type_docs
    ADD CONSTRAINT type_docs_pk PRIMARY KEY (id);
 ?   ALTER TABLE ONLY guide.type_docs DROP CONSTRAINT type_docs_pk;
       guide            postgres    false    221            �
           2606    659870    types_period type_interval_pk 
   CONSTRAINT     Z   ALTER TABLE ONLY guide.types_period
    ADD CONSTRAINT type_interval_pk PRIMARY KEY (id);
 F   ALTER TABLE ONLY guide.types_period DROP CONSTRAINT type_interval_pk;
       guide            postgres    false    223                       2606    660250    baners baners_pk 
   CONSTRAINT     L   ALTER TABLE ONLY prod.baners
    ADD CONSTRAINT baners_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY prod.baners DROP CONSTRAINT baners_pk;
       prod            postgres    false    232                       2606    660257     link_get_money link_get_money_pk 
   CONSTRAINT     \   ALTER TABLE ONLY prod.link_get_money
    ADD CONSTRAINT link_get_money_pk PRIMARY KEY (id);
 H   ALTER TABLE ONLY prod.link_get_money DROP CONSTRAINT link_get_money_pk;
       prod            postgres    false    234                       2606    660268    offers offers_pk 
   CONSTRAINT     L   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT offers_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY prod.offers DROP CONSTRAINT offers_pk;
       prod            postgres    false    236                       2620    660218    users update_date    TRIGGER     �   CREATE TRIGGER update_date BEFORE UPDATE ON controls.users FOR EACH ROW EXECUTE FUNCTION controls.update_changetimestamp_column();
 ,   DROP TRIGGER update_date ON controls.users;
       controls          postgres    false    226    243                       2620    660270    offers update_date    TRIGGER     |   CREATE TRIGGER update_date BEFORE UPDATE ON prod.offers FOR EACH ROW EXECUTE FUNCTION prod.update_changetimestamp_column();
 )   DROP TRIGGER update_date ON prod.offers;
       prod          postgres    false    244    236            
           2606    660224    access access_id_fk 
   FK CONSTRAINT     v   ALTER TABLE ONLY controls.access
    ADD CONSTRAINT access_id_fk FOREIGN KEY (access_id) REFERENCES guide.access(id);
 ?   ALTER TABLE ONLY controls.access DROP CONSTRAINT access_id_fk;
       controls          postgres    false    213    2801    227                       2606    660229    access user_id_fk 
   FK CONSTRAINT     t   ALTER TABLE ONLY controls.access
    ADD CONSTRAINT user_id_fk FOREIGN KEY (user_id) REFERENCES controls.users(id);
 =   ALTER TABLE ONLY controls.access DROP CONSTRAINT user_id_fk;
       controls          postgres    false    227    2813    226                       2606    660391    cities cities_fk 
   FK CONSTRAINT     u   ALTER TABLE ONLY country.cities
    ADD CONSTRAINT cities_fk FOREIGN KEY (region_id) REFERENCES country.regions(id);
 ;   ALTER TABLE ONLY country.cities DROP CONSTRAINT cities_fk;
       country          postgres    false    2823    242    240                       2606    660271    baners baners_fk 
   FK CONSTRAINT     m   ALTER TABLE ONLY prod.baners
    ADD CONSTRAINT baners_fk FOREIGN KEY (id_offer) REFERENCES prod.offers(id);
 8   ALTER TABLE ONLY prod.baners DROP CONSTRAINT baners_fk;
       prod          postgres    false    236    2821    232                       2606    660286    offers category_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT category_fk FOREIGN KEY (id_category) REFERENCES guide.categories(id) ON UPDATE CASCADE;
 :   ALTER TABLE ONLY prod.offers DROP CONSTRAINT category_fk;
       prod          postgres    false    2803    236    215                       2606    660291 
   offers cpa_fk 
   FK CONSTRAINT     f   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT cpa_fk FOREIGN KEY (id_cpa) REFERENCES guide.cpa(id);
 5   ALTER TABLE ONLY prod.offers DROP CONSTRAINT cpa_fk;
       prod          postgres    false    2805    217    236            
           2606    660276    link_get_money id_get_money_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.link_get_money
    ADD CONSTRAINT id_get_money_fk FOREIGN KEY (id_method_get_money) REFERENCES guide.method_get_money(id);
 F   ALTER TABLE ONLY prod.link_get_money DROP CONSTRAINT id_get_money_fk;
       prod          postgres    false    234    219    2807                       2606    660281    link_get_money id_offer_fk 
   FK CONSTRAINT     w   ALTER TABLE ONLY prod.link_get_money
    ADD CONSTRAINT id_offer_fk FOREIGN KEY (id_offer) REFERENCES prod.offers(id);
 B   ALTER TABLE ONLY prod.link_get_money DROP CONSTRAINT id_offer_fk;
       prod          postgres    false    2821    234    236                       2606    660296    offers type_free_period_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT type_free_period_fk FOREIGN KEY (type_free_period) REFERENCES guide.types_period(id);
 B   ALTER TABLE ONLY prod.offers DROP CONSTRAINT type_free_period_fk;
       prod          postgres    false    223    236    2811                       2606    660301    offers type_percent_max_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT type_percent_max_fk FOREIGN KEY (type_percent_max) REFERENCES guide.types_period(id);
 B   ALTER TABLE ONLY prod.offers DROP CONSTRAINT type_percent_max_fk;
       prod          postgres    false    223    236    2811                       2606    660306    offers type_percent_min_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT type_percent_min_fk FOREIGN KEY (type_percent_min) REFERENCES guide.types_period(id);
 B   ALTER TABLE ONLY prod.offers DROP CONSTRAINT type_percent_min_fk;
       prod          postgres    false    223    2811    236                       2606    660311    offers type_period_max_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT type_period_max_fk FOREIGN KEY (type_period_max) REFERENCES guide.types_period(id);
 A   ALTER TABLE ONLY prod.offers DROP CONSTRAINT type_period_max_fk;
       prod          postgres    false    2811    236    223                       2606    660316    offers type_period_min_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT type_period_min_fk FOREIGN KEY (type_period_min) REFERENCES guide.types_period(id);
 A   ALTER TABLE ONLY prod.offers DROP CONSTRAINT type_period_min_fk;
       prod          postgres    false    2811    236    223                       2606    660321    offers type_review_time_fk 
   FK CONSTRAINT     �   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT type_review_time_fk FOREIGN KEY (type_review_time) REFERENCES guide.types_period(id);
 B   ALTER TABLE ONLY prod.offers DROP CONSTRAINT type_review_time_fk;
       prod          postgres    false    2811    236    223                       2606    660326    offers user_create_fk 
   FK CONSTRAINT     x   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT user_create_fk FOREIGN KEY (user_create) REFERENCES controls.users(id);
 =   ALTER TABLE ONLY prod.offers DROP CONSTRAINT user_create_fk;
       prod          postgres    false    226    236    2813                       2606    660331    offers user_update_fk 
   FK CONSTRAINT     x   ALTER TABLE ONLY prod.offers
    ADD CONSTRAINT user_update_fk FOREIGN KEY (user_update) REFERENCES controls.users(id);
 =   ALTER TABLE ONLY prod.offers DROP CONSTRAINT user_update_fk;
       prod          postgres    false    236    226    2813            �   
   x������ � �      �   
   x������ � �      �      x���Ǳ?�y�)�1؁�Q�p����2�O��вC����o]K�l��|8>��"$�� �ѭܪ��@Q�uo\EP��eVWV/�defՎ�ݣz����m��y�)7?l�o~<�<;�F�r6`ElV���!z�����4���nV�6���o6/A��l:���㑠��*;�:>T7�B
�P��uFv�} u��Q1\L��B$�)�L��|(y��!y��Һi�^��x6���0��4]��⛵�O��U�;��}�����}D�^��2�"�jEB啢����kuMT�>ϵ��_g���p<� PegTǇ��+Tk�{�ͭy`F�y�[���`R�{D�%��0)�`��op!nD�Uw�1]ט?oV(�j��	|4'�Ǜ'�V?;f�|r2�N���Ab�'�������mC��=�}t�-ߘ�>5�V������~+���F���
�$&ɀ�F��f�ǵS՚��/��z��-�vLg��+hD� P<�@��P�4
�ԇy�
��h�|Ō�sPq6ʮ�P�'�zF hzPa�6���j��8��Ȇ�_���lj^�<�ߒ8�5�jG�nr��:k��H�#H�>^�pPa��Cب�t��n�3lR��=~���(�(��Y�^?����jF�E�y��q��LӼ7���mY��S�s;������y��_XF� 6���hZu��#T1_f��t���$�!S0��ǵ���|�^�#����O����O7 )� ���a�g��7	�Q���o�.��'����~m5]�UqV�O��$߃���[�r�I�+�&
�z�jM͜���{j;%�Qݡ�vLi�
�R)x��I�/�=f�0�Sw��܈�L�_Q/��h���g�?�;�t�Cq�kE��5W�w3��^'����I&�:E �qPa�71lԭ;u;���]�5��+=>���q6�:!A�o��F}c���8��{^��Ӛ(����'v98�g��|�K´P�eb���7�-"�,Ӗ&�����߂+R�C?���W�RU��W��
��I��t`�ym�Y�.O/��b�d�УzxHA�'��z�=��^�G���A
��2���H��5���7>?lO���aU�UƝ��(��O��G�,�!*1)�&E��8�h�%
j���ܹ�� 
��u>	PK�Ț&<1�<���=���5.py��8Ry02�8�wJ�F"%x�8uu��S��a��F{X�_�`�I�z%�`��{	o
��q�Ə���7敢�����2����,E�뫹�Ͻ���z�Ǎ:k�t�<�u�3Ң�����ϵ�YڟP��X�9n�~Z�{5<��~?�Y~�O탫�`��!ɢ9�^�gi�i[��
�6���8�����
yn[W���$���ԼJ�J5��I��	�V�MSy�����/�Р�&�d���� � �<�f{��������=5����<����+f��43Ӂ$;��m�%
R�=ntX˺�򁑺�����|qFA�A4Q	@��P�''!lnjש[�R���)dR��=�&������d5<�-�f �B؃h��/�}�<n��~��Biƻb�f��5Z��G�B4��Q�g2�X#�q�Fb;���)���?���q�NJ��\��J���_��t��4;�F�� ���Q�Q�?h����4:~�15��Y�_
�
�\��2�
,-�Cq���&k}�-b`9��g��͜3 ���3p�-�lvڴ�l�~zr�)������t����П����[��k/0^�l~�G`V_�h�"��%��oEk��0�#h���ae���o?XS�+ܣ�fK0�L�����}�C
�V���u�QӪ��������`�� �,I:U��0��E9��aFC3��aq���#֚(a��ı�@"�[�\uSw�`�0k��6�yxɋ����b6��sZH��3P�^������EI�J�v���%Ǵ��������m�ͳ�kL���9^ܤ=�K6K]/hX�VWC�_qFv�F�R�fJX��(��G1��dֈ��V��~YE���	t+ʤ����!T#��@��;��I���bͣ�Q#�r@#��+���*�h\808�*Q`Th�
j���������}�8_fs�8'�>�
 �gO�ʇ�^m�K���陈��ua���>`ir퓥G�z���'~��&=����Т�h9f숵&JE�$W8w��b�[]���{qz���S6ff�{�<���ylu�;g"�h�s/l�j���߂���3L�-�4�t�jI��� 3��O����U�ɠi�b4�x��	7�dKݑML��]s��AX:��a=��Elb�˳!��"	P�@
�6�����0��I��z����5�|i����O���QRkw����u��NV��8�+k}R"���ٔB!g7�~���Һ�L���=�+�-��6w���7 �h��R2�狳3 ��!5jW�i�m�n������T�{�l1ͮ�h�.L�	!t-y����>��̠M�H�s�D�ӫ�� �,@� <�0ޡ6�r7�=��_�Lp��
��k���?i��Q��-q���V^ӿ��4�7�A<�+E@Eb�ZG�ǝӣ�Q�Q��^�^�ҏ�J:��O�#��J��*[1���RN�!�4�ƍ9�kJ��x�&
���U�(;��3 h{σh�oO1���A�_��S��gf��l�vͻ̮'\��,M�� -|���WCf��4X#����[�n�ΙE����%�Cr9g͝K綩��N�=X�`���>8��
X|qQ����X�N�Ӆ�eG�-���%��<#��i�[^Dr�
z"�����wZ|3B;����ӳs��i~��UY���ζ�@��ڮk�;=������4��UT��}��<V�F�k��w���aƋ�����`C��%I�
Q��F��{ݛVh���S�^؃��!٦��]n
z�Aϳ���4�#e`�{��NI�\%@����V_.��<�ռ7�� �G,��V���4��-�S�+�TK)���XLG�5����<��Xf4Q�+���w�Fِ����Fwy ҋٯ�j�J��q>�'0"G���5wE˵
q;z��j�W����KgTYL���ٟ��ב)��4/m˽�n%V��v�x.���t僈�I��5��Xe�	7��4jX� ��v?���V���5bZT։0�����.����n��f��>��W2��Э��V��8(t�����-b�h'T,?��l�����ɵO�)½#oS%~�����:A���(�J�/�rjB�!� �=���%n9=g��⼸ wπ�H��hn�so|.�-~��nV[�@�Te�ϋ��l14��'���^���U��[�	'�ދ?�����L'��h6,w[Įh.�񖿽	���tm�B����.��w�ku��`-vG��g8���ΫbtQ\�O9ɏ Z� -�(��6���ԭ{�~���Q��O�%�j���:5+���z߻;�b�<[<Yw���|qF&ɵO�Iy��O�?�Ym|�^��~s�L�O9� �}M����cA�`�,���Gx�;��MXu��,��΋�"�BD-�
|a�����x���Yǽ�{E�u�ۏ���vn�_�����<R����W���
C�~��~7�]`މs�
�u���d �
�4cU�p�_J9��,��;�6��6�v�&xuy�z�EbJ
��FUC4�[|��ǯ`��w�
�om8�f�b6� ��v��`���ll�O�45t� 4��w]��_�\�F�F<�GBK< t�Y ��!�H�_���B�7?�*����-G��&Ebp��(>ھ�xk0j�8��u���̑��_�(#;{R$ҮTӮԁ��]����X�=\`�+��x@���	�0(�M�x��b�����\���EM;y(�7��z~	<�o�e6e3z��"1�N�e�uY(�oW�Fm`k����#���#�*^����W0�NI�{�h�f݋�+�'�/4�C��dԛ���7�qq5 �^�X�ɘ�    ۔�_�����4�G��i�i�Bz�h�070�e_B$W	�m��-~��4�ݧ�#����	p�Zw��rqI�{�
 �i�!�[�W�b�4�9
%8���e��ʹ �\����#q�Z��� �ԏ�G����)����,;��tp4��H�mR%,�M, �4X��քb�_�*�
Bͯs/�\�#H��[P���,셚;�m��m��,�[��̓����Fg��3�����l�\\�u���<��\���\��k�s�tQ�rUͅ������ZYX�:�,,G�`a�������;�TK��fMzz;�c�W?��S�Μ�fuq��(n�so|.i�ō&�D/�>G����	!���r��`��]EJ��ՐѬ˚u�M0����l;ǅQ� �tS�,�v�8
��=V��w�q���hD
� p{_r�_;��}0B��S�e��"�r`7��Z(��}���N!�e�oc+1�v��8��&�� o�킋��'�6иV���P����L��W�0�S,�tɛ
!�F$��c�^�|^����y1��K���[N�97�C	 ����G�i&���4�13�����,�)t������\��7�p�}����Xv-և|1�^��< ��Y ���F�#��7;^@�W���7f��TЏ��(����V3�\���'�^�����uo|��O�K�D]r �Ď9��ݣ�Q��y�|j�O�6�Yq��\���X��1�<wq ��c��
��º�ܕΊ��=�D,�U, �T�
9R��J-O%�q%H,���_1̊�Q~F3�
�
+�b��ov9iR�	��q��,�S��yk|�n ��>[�ӑQp�])�f��e�|�S%(�_�b�Qun�?!�r�9tb�R.��#y�� �V(y�BCF��S��R���Z!�+�(�$uP�����T� �ݿB�N�ؚo*mq�-m�\��;�������?:tE��@�n�[r����v�!���4|E���^�
�$�}՟���]��v���k��؍���,�Z/L�9�⒖�RIX��g��v!���5<����c�\ǥ&�bZ��(`�B&b��Ɯ�^[�b��<xi[��8'~��6��Ո�63 Ę� 1P�ڰ�B:�|3��Yv�p	�=."��@�Zv��-�x ��7�/�*f�����;aZ�fŬq	_|5SrO�h£G��I�3�Y�f�x0Z@�1= �$"����\�W�Ǒ�������>D1�I�t>�#i�a��E���
�q���\}�������=�s=L����5&�H�$@ΣQ��KH�݈
hIԽ���/a��ر����2�8��;�ɇ���Nz�Q�}��uBc"9��@&�Q��0�	��χ)�*����#�E����LY����OJ�L?K'�P����.��M$�v���n���vl��c�l%+ج���V��
�i64�'�U��k$(fl�)���pG�5Q*�6:-�68-yl�LR�ga���#��0ɧ���~*� 
�DC��b<�� �X{z��S w��9��-�������fÓ��,[�I(mk��EY� IK�f ~,U�4޽��7��R��m,_�����:�s?������f�|N_\� �	� ��S�w�|ފ�h���5�T��3C��l���d���CT֔�O
[�Ġ��\�L!�l\�����KOf�˷�-j��/�,f��bY��s�~���$�|)���ƴ�j�G��/E;�b���Z4Wy�#֚(A+[����4�w�r/4j�A�����`FOƋ�jj������wI��Jq)|���Β�S,��צ�
��߯�Η�Е�7����Sd� ��A.��b*��AŞ����/�nnTp���#��&W;��IH�|*��QC03�lI�9��3ΐ�I��[����2��ѥ&��92MiLh��6$��xV�iO�B(	KOĐ8��/d�yb��.���1=\�Q�t�K8��%}��>pIF����5�c�ʾ��ݝ,�&������ 0z5Y�ZC���LS�^������vK]�NZ�g>����~�	���r��´n�`xJ2,�i�h�fK�%�i���P���b��I�T�%M�2 �	�YL�
�5���)x7��l�QD:f���L�e�w��%9�M�<�6�*�)P^pO��������_��Ŕ��E�  "?�=�؛�!M���^M#��f+X	2m��$���)���sA�^�����ZA��5,~��?k�S�������a.(=�����
�,à�)8.Jw���w�¥�A;b��Վ]��'<������(��:gˈ�H���|�K�T� �J�U���V��r6�lr�M�)�㑔|@�t`GN2�!P�%wG�g.KȜAK�$;��Y��ekoa��ào[��i})�}�fƬ~��	D��]i�Z��vV+�;꡷�Ƙ�д�	�����8?i�*E�i�S��|ho�4�s.+�3p	��Ң���p3z�CK�$��^[
&�Q�@�bJ�-�Z�PA�:�Rv��=6_��gj`�?
�}���K��N���/o��㺟��k>��d0���q�5*$�6�e�"Q!
�_����~�k������Z��41����I9)�O��̃��L��������y��4�����e��K��mg~���_��㑸�� Թ� ��>*5�J��J���Z!��b�1*������M�>�#�Ӝ6��*��唱��R��]�&g$�ն��u�/��\�K��1�I��Y����i���^+�q�q.DW���t.�JQ�b[�\����jm��S�D����tP�[�殚r�ݹ�ۇ��x��X�F�Ź�r�}`e ���|�2��ԣ��v��1t�;���"$[���<�AKK��B� 0J�Nգ9%�x�'m�������OJ�%Kq�0!�R�ۓ$���'4��_�;�D�τ[̊Q~2���g��+b��O(��h�$���xX�H�K�)`b��x*5r�����oc�K�dR����q�~y�U8�#����F�Z#l�N�P`F���Ӟ�&ϭ�e|���R�&K!�g��lZw֣r��eB �V�=*w�����j��ɴ�_4�!)Zt��^��#i�@�M���ͥ� �Ɍ ��F/��yF�m��m������L�ǰdɒ.ɔ��_�.��lhl�[k��}���|�l4�#~f HK$��,fu� hؕ����*O����F%}q�M��4�?�h�$ i��¼' pO��@`hbˉ�T6� Ŗx�$��YL��{ ��w*
�|!��S΃��f�2H��u����H��&����K�$�9��\C'��A�D�Z�$Y��y���~R�	��K�N��~Ş��O%0f��d0�&RI����Sz����iȂ�4�9zwJyz��3���j�)������[�.y�����z�� ��n2�Ģi�(;�[�� F��RL��_��wz�r��ھ��>�
 r��Y�sZkn�1=7ے��c3W7�ٟ�SC{��B�A�$T*#�Ni����a�C�>J�0@�{$�=;�Y�
��2r� ��~0�D�z�"�%׏{�%�[/ʵ~�S/�K�F����ɕ��`@�J��B�q�&#�v��|Qx���]��ь܄=�G��������u�+㗗u�̧���r�]��$�� ���@���[�nz�0(\W3��RMy�
���t�m�|��K�/�n8}���%�]�s{2y�T&;F�A֊7�xR,��z�h��q�B�fȑЊ\�n=U���g+n��!Bo������2Ι�`E�HH6�E��8 nH[ݐ�Ձ���]xV�;"'+*�GJ�$����
)u�d9jFN��W�G�Xd�`E<Yf}Z�%��[{�[p	�F��3�4�`)��w�����RͦFN���*�E���n��S#��(r���Q�t�:pZ�b1c�#~�"He��UP烰 ��}�n�����T���#]���|�Q@!�gǒ[�Z)�NjJ) "�; �bu������~w����@�q1� ��� �WC���
Bn�-'�����!���[��    �Ԝ͡�}��������!�z����~��ZRW��tn�f��^�숵&JEؕ��rU���6��B�݄{8���w.q��pV��ڨ���#�z�f����M�έc�� qFT��!�,f]5
����+�Ρ �,�"��U �v;�X�����mjx��nT���4S�����zC:\=&F���`�j@�Y���U P���E(���[֐�W�D������l(!���Z��Q�̦̭��j�p�E�X,Y���KY�'���ҋ�'`���gcϥ?_N��
=&<1w.=�������Fb�{=��Q�x0=�n���(�V
�
�\o�~�3rՊx�qL☥��X=u�/�)���r^g��2�x$�@���$LO缬7ڪcv������ظ0+f9�\L��)dԔ�C[��
ǒm�C���7e�.���yΆ�*9�)��Ъy� ��h��z���_��5�/C.<��)$�{@�]���4��dp�?Hp}���
ZIƾ�$2����2i���(��E���.fY [����Ԝ���>V�ޔ�FGT��hh����>z+��$7�nTI
ݑ{�7�4k��zX+Mީ^��1ޒ0u�Uݍ��0ޒ0u7�:�G͚�O}���j?��j0�á��JHD�'� ��/̙�BUSTV/�qi���E���g"G�+��v�B UZ���1��7^΂N���u�q��I�d������ԏ
=�b�����%�Πt�q� N�m��.4.s��L���<3�5��������=��O�����M����8�-�͏�8�W��w�*�x��ī[��J	x+;�.Ԝ1��j*���x�f�YkB1/c'}]��n\R���_��|�_�K?XVJ�0��)�-+{h�57 ��iJO���~E��Su��rqC^+91`4�&�gi�P��*E�>4�C��S?�c��{��x)Y�g�k1�S*W>�	![�}�[u���Y�
�Le0}`�Wb? z5�^-����/�;3���5	~�-��&������0(�T=ũ,�7*Y>z��ֻY������ד�~�����C�H�����m�����h�	�����Ԓ��-�W�[�fH�l:��Q� � h�-��ɖ��sT��
a�=�%@ւ���7ί��ۺ��]�h���)/���r��O2�}jD�w_o?�>[���j
�I?MUj �����G�rH2�*���N��1tR��.�Ӑ,�s=u�d����6*���
&�1�p\o����y
�P	�/��rF)��w
5kJM뒁=>����L�rZ�K��+����Dq-8�B�� f���]W3o��F>>y��28<كߒ05�Q���_�@���"�0��v?K����Ƈ1�ɨ�w ���;��@��T�?�. 1r�
 �m(H�;�IT���2�h��w���r^\�ר����T���%�ۼ"�$�y
7�"�c-?J���r��i.o���Q��8K`�}���t�к�[N����e�~�-&�{�nqY]����Tţ�^%f){���U�\�ڮ�Vٝ?�>����=�F ��c��,q-��Y6Y����Lc{�X��'���ѩ�
M�`G�5Q*={-����q"��F�����%D�S��Ja���M�i>k�����L�.qP-[��T
x��_1hW��f��޶�fR�Ӫ���ՔL��U�E;.����Եx�q6^:9��F��$0(�_�.��a�:$% ��1e8��W}����?�"��F�8�^�%W�v�`���~L�M��h���&����mL��=E�mQB9>�q�+�/�g �qq����}����Ӣr�`s�##����͆�Cd.5wI�8)��z����-��많t�u/��-i�;v�����E���� ���
�>^���5��'�x����S<�Ca?��q�+=qC��ۄ� ��!UX,+Db�=)�Cŗ� �x6�0�K�ިk������ݺ�A����%A�Ō3�G�w ���n�7�o�50�4���/�hRD$��l��Rp?��m�����p�2�����(�E4 J�ι}�l��E�J�XZ�SJ&�)�r u���\�-�;
�~F�5|s��1���hK�8���]����Lh^G��c�p���"�p�@�S���a;)TJ×2<C�<��e��3��"F�B8k:�J0@�$�[;�Y�-
��=Ѱ��x$���i	�%���� Iq�$�P�&��I�T��:ғf=��#��& �l
ф/ d"� ���,fc�4
�XA���?Q:�����d��ڐ��B�5���j���
=y�
��I�:ɧyR�E���������;:�T�U�J�W����,	�Xk���<d����k��<��*=ӟ�����OD���(���¥��l4�n[O����,/��v����sX��$��[���Kis���E�|}���-�tt���9�R�\� ��C�R�\&Lm�#�X�7���?`�x��}6��l+�����Yi�(�;?�sP8��thh H�5��l�]f�?�vZ:�ơw�F�ELe=���+{��B��t;��v>7=� R+ I�
�	���h*�I�����[��8�{k��HTQ�ޮ���J5Q����pp��
�$�C>���]�	'"
8W��b�����op�X�=D��_�ä@�$% i�r@a�7 qCiܴC��#�r��=3z���]��^�|��Wղ/7x�)s�!����2�ڳ�zx��\�[���xм�4O�3>��:��
�<u���0�"�Ƥ�/�[������UAi*,�G���.E�f���ږZZ��S|m�3��|v��$�� �7z�����l �����<�3�(��9b��GP�5����;�p��`PX$/�dKd`�� ��Ⲙc>�?�Da���
�0(,���	�"�\N��t9�
V�&$k�M,`t��0�M��)�3t�Q3�!l��+)� I�&=��3@Ӵ�2�c��B#��D����dG�I� PI�%=�;�O�q�\�2k�LH��i���~#����-�t3�H+J<T)X�P�!K9D~9�1��@�����a���r�#����,�R���b�$d���K��V5���;��ɠ�8�;��H��^�E�%hs6�L�|��D��W���
R���+c!s���SQQ�6��� A�����������p&���!���|<].��r_���O��L��� #k�sW�d��%d�.��83�/��$"�4@��¬k��2�6Z�ƒ�Xvp�]��0� �TC���b��
�2�j�;d����}J*9_��l�oI��e�l���f&��NH�h��*�4�%J���7���@1u�ue!���?6+e�����R<��2z6�c�����!}����|شH�#��>Ȗ����b�pc����)�e�� �0�JQV�#�鶔.����}�%�W�(���p<�s>8�s>T��
��N%�/�0p���|8��
�V{%��WG�%��ܤx�	R���&��')� A�w��K�M1@�.��T���;Z�G�!��G�&�>Yz$꫸hq�č*=�����2���B0��J0��Dփ=�ؚ��F�ƩzآaE�yJl���̋�#��O����<��y^�h�P&8+�R���3�Az�	�mJ�=h�~!����IR6���Q����SV%���%ͤ�P!���|��	�х�L�޽��
2�˴�KX��&�W8�Ȧ�z�#֚(��X~zJ��-c�Nx�%N�iH�8��(�@���~�>tKJ�Bג���N#ms�����g�8){�^6����� �h��(a���V14�-i���I���N��l�����2�z�r�<��}�TQ��)�hVp��J�$L6������~R,hNW���|Mvíw<�x0��y��-� �M�
�v��z�sgK���Q�O�댶�#����8;���FCF���zV�;4b�\�b:���� �4�F���Ĩ䁠���<U�q�B�4�']��3I�X!X��������r⦖dB�dT�Z.2    �/����B�.��'��B6�昀jd�i����W���&�--��5�׉���z�"o������^���%���V@��w�����ZG��Q�?��tp {ƇN��l4��\�B����ނ<+�AP�-�z���0��N��2�8�!������ P�#*�&�-�vE �mk"ؒ�E�-С�:�BP�����߱�l���� �*9Ȫ��Xi�ӠQ�'*�-1���l�v�:Ά�Y��V`ݾ��8�/� z�TSo?�|���^\��z1}` .MEe�;�fB Ь�ޭ��20U��M�q>��;� w�ncw1�8<T������_�S�����Y�;b��R������,h*oH�����~D�KP��>�����'M��� N�����yT�5۞��هx�؏�|<�O��1�`�j�^�����U8���������������^8���BB����Ҏ���U��N\5���X�� N���ȸ��R�#=.B��UQ�/_����(7� �dR4�⤇BB�=�S���
6�>��rfu7	`K`<v����Q	7 h���1S5�.q�f+^)��׀i>d�
:k6���n��d(?��gi��&��A���Ԧƨ��+��Q�&��Y�
�?�jK@5I!�ijm��J�H�m��g�(�����t����^!!0<+!ġY��>0��޵w���)�k�}���^��s��*+b�O�� �F��F��jKZ���r����o����:b��* \�EeY!h�͚�f�X-������ڸ�O�����y ��tPo�g[9!�@�Q�W�n���I��`���^�O0�]i@[7�cZ��1۬�/X��%I�
Q���CO�Pw:���7������0��:�:�EE p�tPa2�c���d:sر�"�"��������\�&z�F����uI>���u�>NSOY\e��'K�#���H��
ߑQ7�A�z�2��Lsh ��qC8@�N�*+��*��dXot9�(+ń�5���q�xh_���5E�O.���2ɏ 
�A�_X��R�S&��<L���() Jȕ��DyLT ��7�U��. o�`Z�t^��~^��w�c��l�o�N�A�R�!�_n1/&�2@�!$;���
��2�h���3�����d���8ϗ��d�D}��sҊ�����{x�ak�rȾ�]��Le�c���?dJ�������oI��{�f����7wju2#:�6)���,·d!?�k��G8ntO�<�O���_�5Ta���&f��Y��7���~�f�F� H��GP̧���@�|�ѫ�f��,)|+|�Ů6f#N�����b$��* Ȯ����4����3�|�_�k���eq~i��`CJ�D t 1������'`�wS�
�S�ϟ���ڑI[PQ�=�frx]�A�Y��yOa�b�a��mu#ea+�b%�K ��A��^��
%��i"{H�t^P^���BFM; yg����o�n0�&��l	2n:r�N�D%w�`�Ե eS{����y������}�,����&q�'��h#G|�;�Uף�^<�}P�3�nO^2��u�h{�8��$(�l��$��BFM;*��y?�p��|п��'V��t~*+�JQ���T�}������vtg)������~��j���/���+	�{B�vd8
f�|t� ;@�`�vq�,��y����N�	7�yT?=jv��l�~��(���z���>L��)!�=>�^Kjm����%I,�����$L�m�YM� �>ݓ�������%�J�))�=vɉ��0�t����O���޵�vN�5��x$��)@<+܉@�.���i!5�
�c
���,?G�~�� x����͕�BF��z$N��΂7P�;V�\Y�<�*D٫��y��x������tg3<��C-�O��%h��Iժ+������ϤK���.G��U#n `�	�����	A�;��z���g����-c_�qv��g��㑲�o�ܯ,`��*5D���I�7����b���p<��o��5�����J�#�0�t��%qH����ߓ"	0r��ڳ��D쎻�Sޛ�-���}�w؃<��
�� ����Ԝ����4u��nm�	1K�C.� :$E~!�h�QwL��<im���� c�4��	9gBU�4R ܹ��A�'��>��$n԰��O�(�!���:� @o
OiP�(g����i�a)�a�ˆV/���i�,��u�$	V��|	�7k��(�D	E�#l��+/p�./��!P �@j�;J
�2�՜j._Lv.��i1��-LHZ��."K� 43�f�����~�q)�It�O1O��'\R~�N�B�X�����j�6�Zîd
�`G<�-S!o崨P�B0����)O"��%S$�(�����ec�o/�J�j��g����.����̖4��ƪ>@�s/��l8�g6}`J*	ssb7��Is,hN[ލZ�3�:n��VJ�Aj�ԁj�twa���`P�#�N]��$d��J������ F���[N/��F��4� �g��1��y���;v�r�t������}<P�� �0��������c��V��'C>���y~No~��Hr�V 9w�(�n�2ox]��u&Jm�[gS�ם_��k��]�Xs��bܒ��XS+2m�ð�I/^�w�+���8I�W��|{5���noϪ�IUa��nf6~�r�^N��X)�`�[�b�m>�r4�V\̴��f<5�.�./�-���B$WK�Ӑف��b���bgx>ͯ'Y [�]�Sj΍�p�4u���&��g����'UJh���ڨ�'\����珼��V�C��+�Y��DF� $s��9z9�Aߎ�9������}�����S��-_�.��ث��
�{�yys԰n���<�h�}�_�vB���mH��/�]nT�hkG��gAEs���Φp<�-�`ju��*ȼG
5��tU��D����U>��YR$��L�x	�<f��z!邭�G
=��r���9�Ǔ"1�N�eTNtJ�����jbc]�xG���ͧ���O��-z�P�VDLe
W��Q��C��:���oI��e ����-��a��%(��pJ͹�N�mM�-Uy#�����"��l�Q���ӮU�%y&(��`,q3 �yݏ=�����fu�R��i��5�(�8-^��[Ն�lCu�����������Ǔ,�(���[n�so|��ww�F��z$�4T�\^nJI�?-F�U��H�J��F���J*�Q��-v�Aq����Ag|��pP!��Fi��0n�h�p�u��H!��)���JV��c�9Q�h�#�g��~�;�J�������朖J�a�|�7�P�$���l�� �c=ќ�����&]gW` �)[�
�1�|Ѩ�>�T/j���څ����N�a=no ����cǭ~�K'Z�@�[�.״m���S��K	8�\�d���x�F��ZS6�*[��]r�"��`�N�C'�!x��w^�(uo���(U��2u|p�Op	��CG�?�'����OsL��Hl�Ӂ�6���o��69�?�-�N��"�P�t������j�m(���}Q����3������2�Oe����N	{^�N>-�-��ge��ْq_{j|ec��v�"�q;,bz@@�v��"�����|�j�1��3�٪?Z·��!$�!�:H�0ȼb-;4{�B 8}�-\.��)�B�eI�R\�}iq}��7���yg��B����u���#�'��}P]�}L4w�.ȼ��n����C���
8��8d��� �-v,Rk�o(.�d�w���t�lZ���˱�i��ncG��n�{(I�w*�3}UEJԄ$�we���A����u��g��X33�Y��F�����Ы���6�b����Rb z'L���+�)�hH2�Y��Kr���t�!l\a����!�����	��&���c�ñ�'�\_zV��������    .��4ǴM���-N�_�a�¶��{�2����e1�}eB�k#	��	e$��d((���Ys@��A;Q=ZƼc��Zj�hp�S ���đ`���6��N/2����y�)*"^ �m� ��{�ݹ@"��6F���n�q9-�W8���>�
 ���Q���84���q|�ɚ~Tz-f�!��4����M�&ʼh���}=���"�ח��V"��&�r;ިi�_�%*��SZFÂ.�!�^� ����ywTԨ�=m�j��q�q����x�"0�#I�
QJŢ �]j)dS\�żYI��ܲ�Ŭ����4�J�;E7;2�����/[{V��� �����R�Ap}�Ls����\�t80A1�C������ ���Z��lVA'�q������fݭ��ƝzGw��=->�Dmh����gڪ����ײh�^.0�J� ��,�؎b��8�����:�tTۏb��M�{������dq<]��N�|ËJX]Z�R���k�I=n/`;�ʘ��m����6�R�n�+�k䚶wT�[{��8M����ȯ�k��Umo�m{'��Ξ�2�isOY컾��\8 ��_��Mgs���.�jj��:c*,W�(�xu�}藻�Q��n��z����D��WH0j��v6_\�6�hr����E�$F-_��	O
�ͳ�y1`EP$�%)�B4@�i�/�]�P�f��X�n,M�vrw�����;��y�w�����1�A+�~���&(�F"��6bI��t�jNհU���E�QE���!Z�"�� �ƞ"w����^��)�����+%ӌu��`P4d������i�S�*��b���|N���4��ޒB�Y��Z��j����l����-	SwW�݈�n���-	SwO�݊���-��f���j��/�=Ǚ�19�|1��088N�97�s'����\�U���ѽS}��7��:`jr����]T�ڐ�p��#��y˄|��SY$T
V0@�
ܴ7�~LULh�^��R�=gl�֙��h�\��ԛ1*/E�����F5U�[O6��܆�4(q��A�T
�m��A~!I�d� �S��uiο�M�p>����`�/�Y;!�N!��5,�$>��}�o�-uˬ?-�Y�[��)5�Fs��P��r3F4�Z�
�H[L�Q#S�m6̗G�4i '$;
��ă�u�J�k�s4}/V"Jz~��^M�}�Q���ti�-���/I��1@�t�����:�,V-HGA�W	� ��K<wD�JvY���;�,�	�
��c؞N���|��F������B����A�
�o��y6ʆ�~V!��X&@�oH��s���hY���I8[��Tҧ��Ȍ���zu^LX�̤x�&Em�M@�����uxi��3��p,����غ��[ꦋQ1^�e~��,���Lxxb��I����r�%�wHȀ�U��L�(��(������� ���������A�Po(Hp��Q>�;�I���������#����a�U�?�f� ]!��æj̱�i)�zЊz��/�j��;ޥ�fЊf��/�V��!�3�m@����@���	��K��)d���X�����=3CG�&����_��.��4�4��ޤ�d�~�mZ&�
�9�݊3EU1����rM�����������*7�z�KJ%a�Ӌ��w��d�/�2=hM
�5�# ߅�NU͙��z�/)���=	��
.��I��=��N����\t:G�ͫHF��I6]f��1$(OI(l�b�|-��a�O��y
��\��4��ͣM�e�����S��}\�M��q6�8���4��W��s�*uE%�� وȶ	$@�O���HL���Ͻ�^�#7��D��V�_��
���ا^��G���l������6
C��8[Naz	1�,S6���!�1�
zK �^��%���/�B��K���"�8�\�d鑔��q�$�7��E}�	���[~��=:����َ,�3�,�e8r0(�`�*G�g܍�5���q�,�-�㔚s�9|������^�&�A.?��
)������'V�h���Ru"b*k���4B[�Ħ13��a1�%��Ų�>�
۬�vb�\��
g^���KRVE:��¥S����w]�� ㋟�&)g�Y%�d���3)4�MAt<��fa�#�e1= �|��"t'�h&�tݳ�2�e�����2�Lp�5!B�"��ނl��A�iC�g�|�g4��ݔ���`G�*9��,=����3ǖ�q���g(�L�+���QD��}`��N]�8~E�8x:CG.�p��3p�"�<�N�S�î<n���O���W#����M�<���fu �H����W�X�n'�U��F\X��_����*��T��T[��}���V؉�90����}�\9S�����tħƈFr���0j �����5�p#�j0LT�{7�OG�+?P�f�p׀�衦kU�lT\�e>�*�ٖI��aˑ�]�N'��<�ˈC"P���`\��#��8%+
(��zꖺ�,��ȡ6��7���OZ�2A+҄�<�4�6��^�-����8�v�՜��4��X�]�y��H<��{� W��7�v��D=�n �nȐ�TK���c�4��|�A��������K����o���
2��d���وve"n ���#Ξb�ム��鋍|9�Qe4�BG�����"�lE���À+>#0��A�u�jx;5����h�a��
!��JZ�kh����$[����^�Yr�[���*�g� ���a��K�4uw��So1
�	ɖ%�rHT�G�}e~�|s#�r#tX3[`�9�aGt�^N�l~�W�Y?�fՒ_���)!|�Snx�dA�X'S!��SW2
�q�j^�8��X'��̲ɿ0b��:� ��--AF|��q��f��-=.s^{M�<R��
a;z��d& U�����T���
��nR�%dLre�.bQ{t��뇬V�z��{u������F��(�փ���_�p�����t1����J�s�f<r��9\�C�p�����L{���E��L>��b4V �`o_��~�>�NP��/ڌ�OL�j_�{��b�pG��oZ��[KB�f�h��T.�O�9P�k6��6	~����H��0�kC�(�m�~천�:���Z�� �,IZU��& ��Cӷ����⼲����c�������C�b>�*F{lA!�[O�1����ٚ���l8���#9�8�cu��2�2
�J�Y����Q/�dޯ�bq<R�2Z@�/V`ە�@��愤)����E6`E8]����Q��C]=)Y �5�͓���SE��˳��$\%� ��$�v�s�Aņܦ�ofS�0C��`G�!�$Ĭӂ�{{{tV��r=����%��U1�
���$!��%�IĐ�'_�fB�YМ�j����ۍ����{��k�N[�A��w�ݒy6�����&� �. �B
��I�\W]�wе��O�G�����G,�$�@:�(�:it�n�� FƏכ��H%P&�[lQ!���"`��)>�K���0l��N�����O� !��H��'M��SU�;:^���bD�f�%a�6�q����u��/�+��88��/e0��z#�
�G1��)Z�F�Q�.jv�an���Ь���6WB ��)���voa^4n�ƺ;�s����{&���*���I�(�� ��A������7原�5�=
��O%��Q?���>��"om--���{���:,T�?`	BH)ȍ ��`��z���?����ޚ�ra^zk�ʄ uv@a�5#46�y��L�Z��3�=�/������b����U �b;��7��f]�LOo?%o\�����8�^\,��r&E .
b'�^��	��S����/�/����z1��p��HQ��de����J�lU����b6� �!S����s�:P\����r6͸�SЛ��1����lr�&� sH�Lrg1;�� hXW���M    �NdQ������K�$@��E0�����п�����L<����9*1)� ��X�zB���dX3@������?�N|.���N{�����a�������M��uȓߺ�+�}���6��\K��O6_n�0d�$�d0£zS��a}�*;!{J};�����t��Ϭ�2�ID��A�[����	`��v�P����m�f��@�)F!8P��9�1��޽w��x�Eh�q��g�#�=X�K��ųWs�<� �j��&-�{��%�Xt��bE�w
5k���!Y4' �T�W�����F^F�^��[�%�RA�X��7����=���٦�i�٨Ȧ�lr��h�Y`'[��$�V�O��G�]"��4�͗1�k��s�U�r��R�"(�ʒMU!�QT ��4:i/�ȶ3J�|�Q<�'A� 2�������<0� ?^���
<�e��z��qzd�]�v����x�,ɱ}	�Y#��yO�5���FՎ���O�
�K�c�����V�{�&���庢ܩ��	���@�)�`�0^�� ��>$��;�lЮ.f��z�a6�R�N���r�EM�}��H�W� r��f�UZ����9�pq=�F��H��[@f��,�A�R�W��tR�+�����
1
�}��]�_7�}�Q�����ڞ��yp+�
�Fc�uT	N���p?����0q=t9tW��
ފ�����G����j0�D�/ D}��;�Y=5
�T��Lk8}�e>���
�07�t�C�(��ELe2PԽ�nE�'v��Oϋ3�����,�<�vSk
���e�|�[m��e6#�������F&����wA�v�I?MU��N���J�PV��lZ���(β�9O�w��*X��کj���N�^�#��r8j��J�C��6>�r;�;[w� 6�v�&
�OC��C�9#�d37S�(*�bp� %���@��1�
���TP,:��̭�aW��7݊Xn���S�H1Z�Po�XN>�x�}�[	.��xiwI�B	[�ؚC/A�H0�MՂ�m�
�^=�N�bq�Anv�Z�"HI�`�M�-U�X�������Y���!����!P��1�$��tiUȨ�V��S�0TѪh8��e���ON�B'm��$Y�Pi�+�:���p�}7<,��*����J�q+��1i_�.<"�gCk���F+�Z�����C�L%����YFش����X�5n�C`:�w���$�A�/�C�$�� ���cg1�ѠѰ������mݐv���4�!:��ݞ�V@���K�b���'4��0��,@-A'A	�Ԝ���Z	��e$�ְo�$�x��C�
�P���Co��YS�z#��]Ap e�1�wUuC�$���I/�ϵzL�.�B�>e�`EPe��j*Dل� �Azk������)��D!����H��#6W��a�����n�@v�O��?)UH�S	P �1uu��觯_��Ϭ
��I�#�e�_��A����ps���~G×��0��j	�	:�a���X�T��7�>v���f�[e�3�ϥ=�=)�lg�ar�9�kr0�.p�nH�W��~�]$G��{��DE��)2���Ul�����~�f�����<�-	S����+>�f%�O��,���u��2$��Ό,��njms��}	�wEw�Yqi��&����),Y���9q���m��[�g.%�M=��*�|��/ 8���8���b�b��v���
�����j�|�a��(�!Y�*��|*m�JeJ�)�$��P�y���'uV�f�b�>�}wk�䈋g�j�����k�]�KQK�k*�igG��-����9��q@�)e烫b6/��RI���	-���B��N��9]�3�5��,d߃N�[8��F�����l1,�B�����kZ�SR\s��`�c�����y6�I+��0-BZj���8{G�e�c�T�����cԆ&�6��IШP��4�g
<��aC64��^Z�Y^b/ٌF�̙�*��0�,R:��
.D��,hN]=;Y~�V��2�N�~q�n����'K���b¥E�7�4�*��:\[~�����4����VI��B�3v	Ƀ1@56�������g�d�?��a��-�x��-�=>$t��[��vmL���>��m���q;��n�k'�,�-��uB Ã��1��G%w�JA�4z�#V� �*�PGBݝ#3ѦJU�.�\��Yb�.8;� C��7��Jc��m	aJ^��H���cד�5�� l�D�R�1� �܅Fl6�K�g�u*�(k����+����}A/�y��׫U���p�ohrn�x�|��x���Ub�cISu]����G���	8M�1�.���eH��VKm<�WAɆ(Y����sV���D��bX�h�m�t5�N�/f�|��7�4������VS��k�]5%��eq�O�&JEPp�p8W�4����gtGD2=�1����+�dcdZ�Mw ڢC�7�}��ُɀw�_L�n	���XZL���	H߯M��bi�zYL�)ՃA�Kr�ߴ(OV 7������d�0�+�N	Q���J�+���o1��,�}�ra�dމ�>��2 H;-AN~��v[��zM��16c�/��Sj�LX )���0
�fҕk�"Ș������M���ڟ�z	I�	��V�ISk��LQ�SV�H~�v&��//�%�T� ��#���=�8��A��SP;�i�5�	/��e +B\�Gߤ�u� Th��ȏ��;�'�ށOR�,&�I6�gK�s ��x��s8����@ȅF�� �N�"���s7��.�0�?i�h�����r��l9Ά���̤�gN�J����
=�M��a�5.#�"�^�ȇ���� �I�4�3,�CC��]�):�F� ��rn�;��9�
�XA/A���yf�.*�?)�5�x�v�����_��v��첧����
��rΡR![� =�,��
/�-J3�}5j_������ٟ��?ϮF����+�R�*	����X�YȀVԩm�g~�}v���
��v�\L�����4����<��r���|�� ��o��L�D�
s��g{�I��|�Kx�1�
0�4]ok}z�Z�7�!��
�@���<[$�� 0j�A@��_�T����;6�3��	�; �Z<(h�����'mRi�/�Xʤ��&Em� �B���Yn�w��
�I��y�;�I�Hk����5p� ��N}V�g>Bo3�f+e1�/��)�WH�0�w���^��)G@�2�=�w:{�T�ͲQv	��Gr�Tp���IUA��vO�F.���u(��&
�Ћ�χ)�������l]֯R����K{t!O�f�|:�3�+UH%aI�1$����;�dAkx�h��5������|a&{�ˈ�H��ez��,�=�n�=Gg��/Z�.~�Y���kUuC.86W��]'z�f}I�Z��g������*�[j���`;�Ti;� o��Oh�%0�6%��ё�>�#C�̑���
C�G�o������`�����5d��v��lQa�g������łD�2/����C2++시b���]����Lx]~ʗ�Oɐ�����=���?����x��qP^ ��=~��G��Qol�;ˬ?�<������q(�߉�q�w�7�T��tJ=�5�J�7��W��f���D��l��T
���'W �A;D�F�܍�]�a�N̏�����Q69Y��1�i؄��v�'���� +1����G���3��G�p��$Ά	f HjIr���l�
��kX��*�r�\����I�
��W6�E>��~� ���)��	s[�h	x	���Ӱ�|z�O��#i%� Z��(��N
��j9�d~���.���j�;\�]���Y?�
 L��C��s_1ZѰ�4�N����Z���%m�G� �4�
�T�;�ٔ�;NA?�C�a���&�,�� p�'r1(��DG�NǮ�#�w���	��W�N���҃ С�tPipQ��    �KI4��0�� N-�I���M,%����ǐF�**nZ���n�/���YvE4� eX� ʴ��g^�Aа�4��ܿ����},Hh����x2[���ػ�yВj.4�'^����6������K�)�iV.}��L�G�0���Ѳ��/�F�>��p���~�OSS���T5�D)t�
�8ˇ	f �\/r�]vS\��t�X\~�$�Yd�SHx0�.sd L>���QČ!�#?w̧<_��{D@�"d�Ť����vwD �V!H�� ��?`=
8�dk�n��\���n�YkP��n�N�	�_-%s\6��#�GJ6MH��6w�����X#/����a�M�4.DL�h/O�%nB	�j�
wj��VI��-p�{"wmwB�菲s:�8%��,c��+>�|lq|�x�W����Q���<��C�?)e(�$4!�9����U�:�S�wۏ�t��Jl���t����1�҅z%�S��� (��������9�)�/ �B�?駩�t΍���X�e�`ڍ
r����`H9v��*X��-n�zþ��I����&�����������Lz_"�h0��[z�)5�Fs�GP��jӉ7���<@â�Ms�{}NN��I��� �3�^�;?@3@�.��t������}�1�qY�Q$�v�����\N.�č&=֤�
��>�ip���c~�������|��yV-���蛐/+�o*��J���q�~��?.�G��;qy�|F�� p�zr�x;���
�p�Bw�z���N��>�>�� ���έ?��v����;��(�&L�����!tӖ��wL��,�2�\�!׉�
��u}�C3�V��yqY\dI~�c�� ��})N�5�6E�Sm���[p�&��:���p��*dbp���J���v�[��?:�i
�,�B��r.�(��ˢG�UH%`J��e�"+�1�@�a�іft�-����Mg"����r�t
�l%˥cN0]R�7��JМbCc;�X={��&�s�=�Q1���=�	:���y�+i�ڒ��zѵ�19&Gc��|�"�*+��,���fov�;�qN1�u=���{7v$Ӛ�tM����L&�B&ɩ:�,S�7)I��]�)�Hq�������|��p�U�����D��q,T�ƒ�V���_yn�=ݦ���_CO��Xk�T�l1��,i*��7�c+�#;80�jtVL��.G� �s�<�2�����ķ��QT1/���w��Ҏ�lQ���j�~6�hbF��Q����W?�I�U1��-�(n��>�����I�Jܨ�R����3���ic�j1�/G�TʑXm�(En+ th�j����yp��|9j,�?�儔����d��zG�P�_��c�����K�����K��i?�._���G
�eGVu��p1	з$L�=�,�jC\�I��%���h�����N�TU F(:`aV��I�(�A ��~�%l����ה��+���J<۔vyfK��_a�?�ȧ) ɟ���� p]),�,$�Q�����C`�^�	�+����Z th(�V�U���b�.�r�Ȃ�zR0�\�y�m���k ����pO6Z\B��%ajn��m�1J�i����6��ߒ0U�U�U�HZ�l6/)$=`�l�Ѥ#�x1 ���#���
�$d�{���v����@�vW�N,ӽn���2]�#H/ӽ����2��yz�;���qۃ�ɞ����di��FwZ�Jٶ���t^����kZm�W�ټ��YR��BFϚ�S6�=�HL�{}�I?MUuU�Kh���V����r�y/a{��s5&J�j��4�
�� �"s��,�He��sm���u�:�_�Wf� �
ƿɧ�e1���aӆ�Q�~Tk{'9����������"��Q
Õ���Q
�-;f��ޖ��3B�[r�Φ����)�%��%Q�}G�ֳ��O�8'Or��������O����wg`nC��o�⼘a�q�`�c�ڽ�o-T��$Q������ǝ��?�:%��2�YBx�B������f��j~��g�1m����]�g� W/y��EmZ��9�|/�e%����C��]��8���W�dp�!n	~�"�>����AP���(�sH���N�HO�٧'�RR"
g��dOQ(8�>&�JB��Gѹ���V4���J{:�B�b�	&�{��
jb;,���y.�۝�;���P�����ti������L�?5	�m�:�S'��Y�U��H�T� �VX]@�*Tj�J�4�%��[3H��Va���A���5)tG��BB�����=EK��ۆ�Ւ��?�V$�tOA��4�vE�t��}|ןl��fy�QqF&���;�lP�Rt�٥�tݑ ��'mW;4!������tq��W�ڎ�>��2 �I�v#A��N�T>�Sm�^�}]�I`�'[���H�s �U��;�J5VI����]Q�}\ �pb�U� �� ���YL��<4��!��ꛃ�@`�L��S�0���DP���g�*mp�5o\�u��s��u�O�w�	���> ���
�39<4n��ʼ��|;��+p8_���#IG�~;
�^�Z��ꅾڨx��R)��%,��c!�ѨnD[*Usϯ!�s�����Ll�C���N��2@	��;��|`7�3�N��O����t���(�e�t��o��+P��bz�y ��T����q(��gS[Oj�RfQr�[��,F�pL��?�d?�e_yo�;�e�a�p��n�η�7��E�,�|$R� �7�!�9�����@а&�����`C,���%��v ���|X����Z��E��
&Y��Ey��
�՝��K� �	�h�y1� ~K���P݇��7�{��
��cX?i4i����#��'?�e6\���z�"h�jI
L���d��0]x���?��qP4��F��`���A�I��\7 Z�E�F����9����x���Vw<H	�U������Y�q�)1�lD1
Vمd�zZTL� ��é�%-�����G7j�[>�̜��R*	Ӏ�`�y��P��\��9=i��T|A&��=\���[�"�)5�Fsx?�
wz�R�7/ �x��U\�� V�aY����]� С��U�kz����l���0��>&�#J��#$TZ�J�	�����	.Z��I64k�"��U�R{��>�6DѮ�נ]<���3��y.��d���PF���tT	4�ɍ���?�ݺl�۝[٬�ڹ������Z�\_�v1���8ˮFK㟴
b%J��=����Si�+mx�{���]��Ńߒ05w�����`�g�u�:��/�q��y 6ԓ(C��P;���Q�+��|��L�lA�\V���&���6�^Ma{=�A�;�#>CF|&���;Y����'K�$/$�e_$%~l^�ER��?m(%߫
��l׹Y��Ouߺ�֍��[~���v����Ԓ�Fb�⭊���NveJ�ܧ��I��>{�{���D�e��7:��
`��3���Ņ�@k�Fw�.ĭ� ��:K"}�=�c�u���A\G����#�5���r�{�I��^!'�����rɡ��\���ՋA}B.�N�M�=��Z���/�@�m�\q�MD�ɥI�������%�p�$�A���P�ϰ�m�*����V���ط���HH�>kV1����aP���f�H&)ν���+qU��I�zd����nVz���3�w����+�|B����)	�#�L�7�n�Tc�k��h\ϲd���V�Q�j�%��m��*�%;[�Q3�0W�s�H�'-^��v��p.;\����Mw]!SbC+�6rw;�=C�A�e>D��d@�3N`�%޳�N	�]�d"m����ZX��d8�!F��U�y>Ij�
V�E ��w
��W���0���lrэ!�b�?N.�S8�*q����LgM����2�a
X�Mɮ&C��')t�׆�{#�	�&��A�:�Iw��Y���wx6���E/ϑb�{�Qں앟7-	�7����6�l&�[\�����#    �q���2L||'I��X*���*���A(�?�38'�
<�Įߒ�JO�Ҧ����H��E�gJ
�䈹gJY&v��$���Z���6���7Ǿ(�GC�:E$� rl� �,R�٢yP#���P>����Ѵ��S����� ��ؚML[v��b��;�p���+e��]*�`� �T�B�W�r�� 8�GJ����A/l�p5t��U��|��*X��   D���G|Oq�|�����vZ�{E�h��XE ��+vK5��du�=b���d�9]]��Ǜ��Z�Av�����P����t����c��Y?���>FG@�g3�ct�@$7v�:��������n�e�wztU��j���2|��zt$�`�E��A���g� @sO��
<I�T�bQ(��O����v�*¿�� 
h����Ʃ���(�{?��ڪ*
..Z���kz���<0H�j�"T������{��|�h����|64���L��K��_(�*m�J}��;���p�����E���a�n)�l>�v'LM�9�.�ż"}����I�� 'W��
^��o��=�8v� �/i6�M�x
C��Q��T8�:!l*�<����v��,v�"����7�Eu�F�{���8��=\�n�nԱ�zX�Ӯ�'Ư�4s�'�|b��ۨ�O0���XILI��I��o���@�(9&d�N�$�'���������I�~]�G�^�!����b��K��-e!xF�_�ş[S��k܅iw���hR�����Vj��
��o��<6�>��Mա	�ףy�u��G"k
��n���'&���M"��ބ���o!�b��L
�w,z�o��1@�;�M(�����`�)ur�;��AB� hPA#vfCac�	�<
o�DӍ��'uz�,C% �Jvg�I���YSߒ�w��/-!��pKJ�D"�J␪�+�|Qav5����h�ӿ���ޒY��B�+�?�E'Ȟ%�Ķ,��Z0_�����_�-$m =�e�8~6�	ٟe�F�ٔZ�a;�}|EJ�	x�*�i����L%�p��&�(�w��ӂ�O�(&I�*
�p��$���@��\*�����8!�����
=7�O!B5�x��2:��Q�0(n�qm�<�̳�����T�˘L�8�O%#�1韏�F����d��
d���G�E�@���_�XW�
6�b{�!d��X�_Ɛc�+6b�݆����������� �P/�U�l�|�l~*X9�y �pi��A\4�S	Wj�Mj\z'�@�ɥIzǨ,3m*�p�0
��I�6a8����q��a���'��[���wg����ޫ��A������ƀjm�:)0�>t��)����jx`gs����>%�
��ԉ{���6�[e�t�&O-Zv���|�sV��
�Qs=5���X%����+�>�ܻ�}������Pۤx��}�J4���	i��p2����U�y�*��"�#Z�{�q?�.�������R��2k�w�g�=w��u����1�z-��ve�]�AP���q�_�h�G�F��Ո��z�Nׂ��ݝY�%#�s��qP��m������I����h�IѮg���ݎ!B�Ԕ인��s;�H��(�������t��.�4/&B�d�7�����X�^/ǣ~9��k�%��E
�x����1�#���D��7�F\~���zp���8C����8t���VfE���Y%q[�8wU�W��Z+K}A$�ԧ�v����J�mM��L�����Yd4N��u�>ܐU���A�+�De_�[I"�+��ޅ��Z�<�7���Bb[���!l�xt�!F �_��/wdc�K��2�7�Vs��0,=����P#@T1
U��l^�AQm�k����`p�\���YRQ��$�SN�
6�f��7h#�=�y'�("�I�27 ڻ2�� 脖��2�L���*�֖��/��1=��	$�wd��Aжj��n�Νͫ��A��X���b�ICⱹ5���vXB���gq���1I4'�/fc3)��%Hڭ#i�2F�ƭz���ˉǋ�ᨌ���mWHޒ|�J�_��j�I�Ǻ�'!h�xQP���Gr�¥d��T�(�ݪ����V�DC�pBf`��X ��a#�h���n�������3��8$�*!'�6��H>�VS��^aX,�xMz�K�qX%�v���+XY� ��"���!ڣC7N���'�&�ﲘ���e��q���%L����ESmQ\�d.��l�u�P
h�wH��CveRt��r��Q�@�c�[zo�׃}��Z�U��/2!խ����ܜ�>��ۭ�v/!��h�Zn:�E���������E�|�'�C�$	2��La��$����?�^wX�#�'�n+�0l����G\u�ܪ$�[�|�MQ�,�6�	L�=��
eJp]�v��E��o�x�̬��ya0~�%����>蚎Z��UVW_V����X�R�
"#�c�Z�f��ńm��o!�mz�����/Zoٳ���j��p���1���q�����/3 p�#3p�a������b�}s'�h:���d8���۲�R'��d;V����?�Se܍�
����yw2�	DW^fa�9�o!}"!@��fh���
�a	3(�E����JSk
����[���%��9p���#�JR���d�L#�aw��	G�� ��Oܫ��]"Fn?<�v3�� 8�Դ��� �������EqɗP%�Kw����l��]��%v��޲�����L@��3PW�B�<t��WP3uj�9: �Y�v����)�N.�R�'A��$�w����i�@o凓�?�����1
՘c�PQbT��K�?y<B��i�!��`Ȁr�3�?�0tSI,���pߍ�Eh#��h8��R#CO r*�@r(�#3;��0|��!�� ���bޗ`G1h�1M<��d± �x�dl{A;G(�G�e,���|���= N��������F����M.z��6�JС�O�E8yV>� tN[	![�g8C��ѡ��9�}^��<�M��Ng��]�QeR���l����c�J�N�Z�^��E}�{�r2��hZ�eɀ|$�|�_r �Vܧs f��$����2Ċ?�QLR��= �����}�@����&�/�K��Ӟ/1�$�@"m��"iD�+�dj�h$o��h>-��-%D,wr�@�����ʅ��ߋT��#�I*�`ۻ�b{� ���d�y�icN16���,��*Y���߅u���`b`xkm/>Ǵl�	t�i=�����Q9�7�@���Q$��OrL�!	�ВZO�a̒OA���=�:�'���P̚vf�.���Ɋ@��`�Nު���xP.�!"�JRl�c�Q���M,u,ۑ�Ӯ4Jz
A�ARo6�bJL���Ef��S��lGId~��/5KM����f�ڑzq�L"߂����㽉��c�wx
��
&� I�T�	m�$6 x��=�]��VŰd@m��`m���c��	 ��T�>F.k�_�Rrn����_���@��ݑ�W�	���7_S�&t���֙��Ër��L����fuYr*dR�K-��}����Ϡ�O�x�L�Q'�&Igx��|� �F�4Q,�;���1$}D1I�,�6;2h'`1�q"����m���𗸘��!b�d��̆�� H�R�,%����Jt/��"�f�U�f�~�n<{�g8X���?I&	�b 蒭�;,��Q5s:/&R��Bt�jh�g�+���{ �\rS�ay��E����,:��h�/{nSz�c�� �N>
�q�9�4�����\px��u+�k�Q��k.���\�
��۩�������ĭ:qЪ�b��laBTm��].t@�N�!"5#�$l�k��~���TD� o� o��-[�IR H�	�ud1�vO�٘�
Z���@��ۑ��z�E�m4��Ͳt�p;s��2���o��o�d� �DD�g�@�}6,�e��--��XC|    p�=�l�������s@�)�S�sC?+��s�O7k:���k˰�_��:D��[���x4$��=���΀rl�3�?��0��kGƐ�ܐև�/|���xt�?���ۨbR[E��w,���Vr�.hI���½��5�Ӂ#y�̄��O�jD��M:ob;��y_�,2��h1����L��J�
���/�}���Q@�V�-W}�����D
 ��P���[�)���e	5ĜHAbV�5�73� ��g
5
�
C��3s2:3Ϯ.������_M��TS�U�X.�u�����	*},
�/}���'���$���qn�� {��q��D�۰5h�-�Vn8���N>���m̛�(�=�$iI�YM?�7��5�����r +b\�RXֳ­D߫��0���_���G���ˊ�i9�F�J���O�l�|$ �̎�!���c�qgbHS��
����n�
�=s�ȥIA:�#iJG���!68�aCF�g�p4��=�Y�H	LMس�5 Cp
��w����N��W�K�
�d�˲��Ň���tլ��"����	E��Z�S��bw��%��G�TM����W׌[z��|�6t�[�������������Р�)�H
�]Cp��2.e��s
lH�b9�Ȼ\7p��mc�jeJ�}�'m��I�'yr����5������c���A��jΨB�3
#��Yğ6��sM�\�dF�ۑp3��X�ɑ�s
)+8���7;
؉}�����>�,âi>�?�(B�M��pf�pn�%�:� ��R�JР���N�*��<�.�$<�F iRD���X�bAQO�᪇ר�^�Q�e�Q�
�^�������y]q��輴���S�(>�D�����b\�-\	U29[薌�qI���A��H�'��v��ˍ������~ߠ>��}+�듮j5������;�t_��iwj0���g%��gsL�rB*Us�����W���b~���
��ɕ���<U�>b�\�����*6�ʅ�Hjs��P�ڑ�$�c�W����W��F��� ߪm��)��=�)0������5I_z�K� �]U�x�n��=X5�]��/��{�7��#���Hg� "*HDܚ͋�AQ�_���)_\������Gs�ٓ�'	�$��Y���l���5������S�f�ʽ�Y@�����~E�F	4]͒������84�ƫ�����͆�x�B��Z2�U͙�|[?��,j鯺��������ғ�6�Q\�}��Zw��\��mb��7�\����ギ�8��\X\mj��G�_�
� 8��K�}��t5�$o�h;e�%�bt��t�/ ����-��<��ɰd����#	Գg9�y��d&Ԋd<��}�2*�/"!F�?
�?ږ-)$l��o��ag\��U�p1L�%���j��Zs�Zs�A��̇��= U3��)�uj��7�w+��m^�T�n�I�K����v��S+��"�҉���-۶��ۦ5.U��F�m��x�7�kZ��t�w�$�"=�6s-R:��ұ��LU^���IC�n%Û6��UNd"��-dG�AI�r#	���� }Q`���xپb����b��R��I�:-==�3����%NS6V���^Y��x)��ӯ쯿�A!۞�rT�WA��I8�U�7���qj3]�Wt��L��Ȋ c�"#C����k�[�"��y�66�Vmjk����yL�s�Ə�'t���fxW�����P��@]]�$�He?H���z~t��ˌD�A�
�|Q[X+I��C�]�S���C�����fh�7��c2����'o�e�.M�����Fp͆/��_e:x\�
K��լ�$������K�ԶJ2�U&8�������
l��.F���-%��Ĩ=��QjH>7.5(/�͹ie.ӡ>��}�Z����i�}ӄ���%_�����|`�i��)�X��dZ�H�0~��D�U@tMw.e$i���#�vC���C��w�R'QV���P�fN��e|o���xa^�QL%� ֽ-�:�t�� ��A�yбQ������/��\�k�;���OH��pr5�\����m�����B�u�`��a�7��5& �oI�O׼�wa�R��DJ�1`�$�i�t��H�ʠ��)\��6�Wx�a��3JOYi�cM�#����nI�j�nk�B��΋�op�(&���5���eX��|��"��8�~Ca7_��wV�g0�E���:�1]eD �#"%��zH�#N|��,Kd9c��ݯ�<!8�;G"Kw)Y�W��@��c'����C�Q�ٰ|w��ǰ��&�A��<)~����9���<��ȲD�Wb�U��8��O���ZY;��֍(�������
�G�{�q�
�������iKT0��ed�e�Q/!��7T椘(W0{�d@���r�����
��<؏G�~1�ghx׻����@N0ǵJ��o���xv��D��Ha �q��[I��d��:���d��:ėnR�j4�!
���-Y�[�@���B��[���d�v�C�E� �D�����Y$��^�( �M�S|�a���W�E$���ɕI��;P)$�fw��(���w��l�?�?DgH���R%��
6쎐\=���޶~b����WM����%N������DW�� G`K��
�s�l1В�A�y�j�!
V\oEY�13��y�_.2D���׻8h\� �.�����E����m��8���C��#˒�D3��o�-��Ad؀�4�(X��1�I�.\����y����,�q	LK�=��e]J�4Ud)�=
���x�Ԕ��Lg06C��5q���B9���A���S��XI,��7d��_J�_]���
�3�MZ�YA�8�YE+�gq�4O�7r����{�6%
bJ��f
�֛
�0n�+�a�<!㶳�$�[ a{Z�mJ�g��~�'?��h�jt��� ��@@S��}���3S H��kZ򟂣:�|	>𣄢�K�$�*��FL؋�Շ��7�Њ��^wҗ�=˒�@&��Df�"��LL�ԎT��+�X@�7U�_���¸%��
��5y��@ 5�����f����$��AwX�����_���M���������,%��7���Iy���D6|�f�r�u��b�i3���_�����=�S~�)�'3�=J���f��h�<IdY2��6m������Mۉ�&��k��rS�/g�&��^�v��ЕL:6�Ϫ�ĉ�fÞ�%���Y���I"KB��蒕��
I7~��LCc"6������b�O�(�.Ŵ�ʼCQp�� ={d�@=1�"��@�>ãÏ�u�Tu2/�}�_2˒i_����߳��l�^O��>�]��>}80-�c>�q���x�ov�-����� .�n�q{�Un�?>#EB��M�"�����Q&��&��%�
���8��xކbx�� y��mق��Qĺ1x�ya*���_��)&)QB< 1B*3�� B�J&�����H_�aH Yb|����/.>�����M%rË#���g5pC�Y%� Y
D��ȶ�7;*e<V2ʨ���_q"Wl��nK�+�G,)�̀d+�Wv
:��(��\�:ߢR�������@V	9o検+gY�r7� (DK	!f��!�G��f��(:�4I�%Q��$����G'��^��hL��c5�����,G
>Ɂ��rn����;"wC�P�rHb��n�~؋p� /k�d�<+n
 H�8)�V�7^y[�Im�1��\����T�Q�2�X��-�k�Hn��#�(��"�Nr-���l��&�� M]�91�������B�Iy.w�g8~!�n��jR�-�\���o��xb@�/&h�<w���m�)*y�z*�)*���.-�t��ʵT�R�����Q�
8�B���󎐖9�eq6;ٳ9�nc�44yb��h��)�J��[��O��Th�17W+�䶈��������C�
�ج�D��XIO� �D�Py�wn��El����lK2    I>X :�*C�!�%BՍP���M.X��8�}�DH����ڶ�ϩ���|DZ�^w0^����S���$��2C�)�~Bm���ѐ�'D,wr��+�2i��w&�0�W��^�Ň©�/�d̔l,c	ޔF3Nˣx�RZ.��аm2=�������4��gs�̨�S�Z&����(q����ܥUD_��/�j�w/Į!ˑ�Or����i品An={O
22{:xX��jj�!Z`�Rܒ�+���$�ml�J���yGn�?��x�	5(ȟ�(�ߎlk��˂(��>�^}�J(��
�2{�hO����ȼ��#���=���cV�c�f�(*�7o)��RGT2vP ��Rmf�h�N�t^�
ď/~Td3�Y�2=��a8 �a�6Kӑ�f0Y2�$�~V��ʲ��J��T�M��5�z�ҝ�]��O�U�O)�̫ 	N�c����ߑ�L<�fg�� �'��Cb�ٮ
^�JB�n(�����e�h��_x����q�%�W���{��~\�ڎ��g��ͼꕠU_,2�� �`
�c�o�����뾊	�?�0��2�XI�+����}�T}L��kD�Q��b�[��������2X��9>V2y�z��C��L�����"�Ct�m��p�53m��� ��
�Λ��Ja�����$*�$C�:k:v�k��U�T(r�«j<S�euD1I����:��GQ���bń�s�e���?�Z�|�Y�uPM��#�Fʉ<2��)�5��s��Y��3���8D�ۣ�u��g	Ѐ�#n ���U`+�iX[�~��,��XF�R�TeY+EC(ZM�֪Zp��=)X��F��]��+�e�Xz�����ԥ�#m
��
�WdI>$wǈ�������$�f��x�!@���!�G���p�	���,5�0�	�$12�莠-(������"SC�/7!'on���PL�Od��1��~C�!��X}�J&}�����e�b�x(D�ْME�	 �x�D�:nܔ�6���%�*��.�m�~���z�_lJ#�E�#����#�>�޻8s��+e��ٯi�(M�t�Wr�V�J���O��@+� �����F�g�/q3��]F�rJkC1IZ�(��.[2��EC SKF���ނ=���~����<k-�$��3 ��Y�A\;�2�Ԁ��7oػq�/���Hw��X�$"/�u���?��ܒ7W}���BrM�|4�ۙA���}�"��)Q
��2�k'�XDi��Sz��"����G=�JH,U^@���ķ"��6�x�-��Q�aH rB���학]R/2'���zr^�����n�̫b>:�x̬d� �	B�$�*�͆�Dl^��g�oQC�J���;P?��-=Rƈ��	��-�h�!x��ꧣS��1�E��R${�����E�(aGI�k��Hڡ�lP#�'P1�M6�FWy��+צN��
�8�aޢ��@o�X�'��#���o�/����� ����`�_�}�{�b��\�?����7�0�@�Xm]U�����ȍt�N�;�N}T�J�
y~fI���gq쿚'b��<5`���4Kv�W��fIBV�<dM��H�⛪��
�.�^1�X�$���Ь	s��$h�jcX	dڦڕ�'�D ��쑙�Pb��Ɂ�u�փ�Ki��Xft���U�(>I�
VV� �h)!­�7E�i/W����MX"�)�QK�v[�U{t߇�&o�_Ix�r@Qy3�}w�X�2ߐUA����N
���[��'��M?�^&��h0q�+�GxX�-�Νe��!��^��V�������bF׏�#Տ���K���s�8��F}��E��^y3L�̰����]�1�s5�sb��"�B�w�\�B���`�r^�!`ʮ<�F󕢣�}�d�w��gk
�u�����[�-���8-x��'Z	HWC�yM�D�0�=��k�m�V�r����=0����.*xbК�����n�M�n�"@�f�^�9Ch1كQ��/	�$��r�T�a�Bأ�J��N�On �s&���_���b�!F �A
wG�5Y.XE<;�۾�许�F��Jĭ�#\%P��D��XI�-�Q2��e�B�5����;F�J�9�O�)u+�P �h��_�p�+��!��(Cot�Z��}��[6nV�`��)�:[6�����KY7 !Z΋�TVԕ̕$j^���G�k�5&��B�������K{���8�	��>��D�	�F3�b��k��ds���g�;�A��n����]Wuo�/ vܡ&?%G��ᢸ��߁���Mu�rB�3� ��=�����(�eS�Յ���� �*@f ݲ�Ae6��L ��L�=���Ƌ��"K��}:/���D5��|���YV5k�����0t-�d6>�M#X%$�!'%�a�Ut��?Ӊ��$��Ӂ�4����:F6h�ÏP����"?|q����@vn��p���p����B�JU��4Y=婲�z�r�ª����3��t�3V4\%�*	"W��P@):M��щ��ѓ�̏�"_N��
������8�?�kG\�>��
Z�.)��i�+��l�+�R&Q�qk�q���
kq�Q:�_�0�[X+I|b�'�	����
26�.�L�nCtK�����H�݀�_�g��
�=U�\�#�z�r�9"�VQ�#*���-n�ӡ?P�K4/2wn\��/�)X����� G@Ӄ�D�Y6��^�,/� \?�?���t4�+?b�����\fG6>�� �x�D$��7���'���XAy�LR|<n2�Ȱ��P'"�6^��ߒ�aQ����%�X$i�$+�#2	E'�~�`��u�eL5��%�H�5f����^1-�ݹ���q{�p"��9r�~���E��6�I�sxG�Y���;�c<�=���aU�]�v\���
�dC_��o�2�e�kZ��ɪC��hLG�E'�&)���ލZ �E�?mS
��<���7�
�������H���+O����������6e1���6E�*A�$UV��������e(,�^���c�Y=
��aw*g���R!dI�N�gq�f��yjN�K}�Ӄ^�� _L&���N	�qO�ħ��X�Z �8?��}B:�A�m���3P��
}�f��!��U.˩�|���'�U-���
0�/stE��V	t�	It��b%7�[����
�deq�/`Y�0��-�d�e
6f~�P卑�0��]B�S�0y�	�+�(�V?ް��gq�5�ԗjc�	�<��5�<�CX�G,��^`���z�9�W]��Q#��6I�#KfA�Q
�^=�-(P��̦��e:./��Z�,K�&#�oɨmn�3E��jol��fŇt�/C3�x�8Q�Xz7V����U�}R�7˺�]s�ZC�ҽ��;����0��PK3��0ϐbhF��hG�_~�$Hq�D��V�t��,&����f�,=�����>iǑ� ���X
���\�N���8�1!Ñ@��	�W�Hla���>��\Bh�Y����S����Ќ���H����s�`U$z��l�Z �����0�T'#f��v'L���9h�C\}��/�M�g�qB��'6y��y��x D��(&��
j����i��=��GB| V�̺}U�̽��=��GZwp��&^wH��q�>:h[��A��Q)����P��gYb����p�"p��) Do*����s<Qy��SZr�(N�a1<�V��B �}���g���%�x�� wn`���aoT��� ��;��-Z6¿w`0�Hg�������&��l�Z�
њ`?��
���ZCp��p6.���U�*>'���4};"+i�zg�PBSV��%�A۪���5LL�.[����l�i��>:bߜ���ǀ(bG���@���8�S�Ƣ_^�1x��!ްl�ƫz���G"�����f}�|�0�h���d�R�/���n���-��>���������b>��G��E1���%Q��.򛻍p�'N4�.� wB1I��V Y]o�ذ����W N  "��q�"�eo�_�Na{�@�H�7� ���&�ڦT�N�����ްv��\�i��f�>���N}��T�C�y�!�Ԝ~Y�K��rx�����͞�=�����1�u��ׂ�c�0Ц��Y�L�Е'ܕ��n
�0��5
!���Ey1�Y�{�@Ζȩ�:�:�·��&��*A_|��A*X9�K P����o��g�u�o�"�I�,@i�e ��2uD&5(}Kv�#�Φ8�X%�/Q�싘ge�B @�'!�����]���6��}xa@�H�� ��Y��$T[S〺�g��{Z��=�����>I�|���������
*      �   �  x��Z]���}����>(���R`1Z�@�\�� �S�F����E
׵cA�Zg׫D�%����H��\�Q� 6l/�3w�{g&&X���P^����/ʻ���Q�*��{�����; e�,�BV��d0eY.�_����riX`�e>������\.���w���ţ`Jؕh
6�]���~���*�<e(���c)48`����fT�±��FS� ���4�TX

.ؖ�#x�=�AZ��W�ضD����\��R;��S6�D�|*,�l�hXm�U~�˦�y���lHe��Bz`�
!+1� Ɉ.HA�ۣ�"]1y~զO�88��	�����K^��b���kM�ɜ��\&�(*jl��^��;��s]�4��W�P�Z`�����c�>�_�e_Ȧ�x��T�Ɇ�fxҴ~���cF�_�P�:�X�v��v!�Fw�� 
R��u ��M���qO��V�����b��S�9���D����}pd�yë5ڄ~�g鈚>EQQ�������
�F�>8���s��c�@���p�~�N�(Y�_0;���?9
N��x�	�l1oQ�gQ��8b#6��\R�[PM0���~����$�֢(*j\��z+��ᐉ�Ҩ6o���v���쟸L�b���œ�q����x*).�6��A;\H2Wʨc�Dx�:
|
���~��2�l2���N��Wv�w�>K-�]��Z=pew{��&q��F]�4�h��X���ׯ��?`�%�n<Bu��+[�{!�7��&�i�d�Q�	ՠs����4��|ƶ��}�M�=�7�N�)���O�������3jp2���O���9:��6�X���!T�.xe��C"����B]R�{�5�o��km�1����2����#�ע��9hSg� ���
K%��OD<��p����(���MQT�}�dc�(R�ꀹ�,ЙS��L�>��ҥŐS���*B�Q����V���*.|ٿ>�IM��-��[��p�
�E���Oh�	���&����u��M�G�����ٴ�_0ԁT�.��}�,�$/xâ=��q�
�@�P*���|�m~ί�t#P0,VSFBPGR	���~���Jx����G�������� ;�
����a1

�BZHH�����{��'.�����b!l�1`�8L��8��4`Nl
e�{����O##�n�v罅vL�l�	�3\�yk�Z��_b �����,{�Q�4\�v-�R�Jt7����5Ɵ߉��K��8��4di��v2õ������+����iT���U�ׁ��
�q}�������/LEJ�Д���1�I}1
�,۫���p]ɡ���/*�2�i��-��z`j��ͪs��Wy�*!�uL$�h��>�aIoű�F�u�%�0�7��n�v�X���ܶ�iΊ�R�E1�>�U�
o��e��'Ѥq���u�Ԙ���p�����Y�������`�l���
�S�0|��o��M����Z)B^���QSm��r,:�Lx6���)��6<L��Q�AT���,��ls��!�
�F����z-օ����� ���͛V�4<L���#n��c�^�
�Y�'����jT��0���镈1ٞ� ��'��M
x����vv�J'㸑}dx>X���fɰSљ��� 7�^�3<��ʳ3E�Ћ�p'�7na�a���a��U��4fax}�e;����)o��ݙQMt��R��H�K=\����ȁ������j��E�Y�2:N�1�"χ��x!΄7�k���eq2�7b�t��2���D��};e�D�-���;���އ=D�AU8�dl,99ދ��A�����+�d���E��D�^���/�
jo�����4�fa�L��"�O�����@M9�G~�#����|��~u�y#$\.��|�#�qVGt�����8������$N��(��0��d*��@m�q������"��UG�1���eՃ.��;���޼öNd��������脎;��l����Ĕ.[�Y�e�}�������T,�\#4�0ɕ��tz���BO����#�=?I��3�`�&�=��@�9|��� �Ļ�yGXԹ����<?pB��0�y��w��9����O/��<?���#7oڞ��m���M��b�x�ᥓU��i|�Ӡ���=�z�'��ۯQ��m�-�h96[[��`ϒs�U~̣�B_瀆���|PO��ԖQөm�k��+�0��

�      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �      �   
   x������ � �     