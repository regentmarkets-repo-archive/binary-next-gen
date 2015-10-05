import React from 'react';

const AssetDetails = (props) => (
	<table>
		<thead>
			<tr>
				<th>Name</th>
				<th>Value</th>
			</tr>
		</thead>
		<tbody>
			{Object.keys(props.asset).map((key) =>
				<tr>
					<td>{key}</td>
					<td>{props.asset[key]}</td>
				</tr>
			)}
		</tbody>
	</table>
);

AssetDetails.propTypes = {
	asset: React.PropTypes.object.isRequired,
};

AssetDetails.defaultProps = {
	asset: {},
};

export default AssetDetails;
