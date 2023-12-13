import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

function ProductsPage() {
	// dinamik olarak etiket değerine göre cache bozma işlemi

	const [number, setNumber] = useState<number>(0);

	// number state değişimin takip et.
	useEffect(() => {
		// number state göre güncel başka bir data çek durumunu burda işliyorduk
	}, [number]);

	// Not: React query paketi kullandığında async load işlemleri için useEffect hook ihtiyaç kalmıyor.
	// useQueery hook ile async veri çekme işlemlerini gerçekleştiriyoruz.
	// useQuery Page sayfalarına async datalar çekerken tercih ediyoruz.
	const { data, isLoading, isFetching, isFetched, error, isError, refetch } =
		useQuery({
			queryKey: ['Product_List', number], // useReducerda type bazlı actionları yerine getiriyoruz. buradaki unuqie action type'ımız query tag ifadesi. Product listesnin verinin react query tarafında işlenmesi ve denetlenmesi bu key üzerinden oluyor. Bu sebeple key değerleri unique olmalı.
			cacheTime: 60 * 5000, // 5 dakikalık cahce den okuma yap
			queryFn: async () => {
				return (
					await axios.get(
						'https://services.odata.org/northwind/northwind.svc/Products?$format=json'
					)
				).data.value;
			},
			retry: 3,
			// retry: (failureCount: number, error: any) => {
			// 	console.log('failureCount', failureCount);
			// 	console.log('error', error);
			// 	return false;
			// },
			retryDelay: 3000, // 3sn yede bir retry policy uygula
			// refetchInterval: 3000, // 3sn yede bir güncel datayı çek. belirli bir süre sonra arka planda istek atar. schedule işlemlerimiz varsa mantıklı bir kullanım , pooling özelliği ile arka planda belirli bir süre için veri refleshlenir. Bu olmasaydı bir dahi veri çekme işlemi 5 dk sonra olacaktı yada biz manuel olarak cache bozucaktık. otomatik güncelleme
			onSuccess(data) {
				// veri çekme başarılı olduğunda tetiklenir
				console.log('onSuccess', data);
			},
			onError(err) {
				// hata durumlarını yakaladığımız kod blogu
				console.log('err', err);
			},
		});

	if (isLoading) return <>loading ...</>;

	// if (isFetching) return <>veri çekiliyor ...</>;

	if (isError) return <>hata meydana geldi</>;

	if (isFetched)
		return (
			<>
				<p>Number State: {number}</p>
				<button
					onClick={() => {
						setNumber(Math.round(Math.random() * 100));
					}}
				>
					Generate Number ile Cahce Boz
				</button>
				{/* ['Product_List', 5] */}
				<button
					onClick={() => {
						refetch(); // manuel olarak cache bozara güncel datayaı client state çektik.
					}}
				>
					{' '}
					Güncel Veriyi Manuel olarak getir.{' '}
				</button>
				{data.map((item: any) => {
					return <div>{item.ProductName}</div>;
				})}
			</>
		);

	return <div>ProductsPage</div>;
}

export default ProductsPage;
