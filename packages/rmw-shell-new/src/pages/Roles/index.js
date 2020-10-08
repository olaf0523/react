import AccountBoxIcon from '@material-ui/icons/AccountBox'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListPage from 'material-ui-shell/lib/containers/Page/ListPage'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useIntl } from 'react-intl'
import { useLists } from 'rmw-shell/lib/providers/Firebase/Lists'

const fields = [
  {
    name: 'name',
    label: 'Name',
  },
  {
    name: 'description',
    label: 'Description',
  },
]

export default function () {
  const { watchList, getList } = useLists()
  const intl = useIntl()
  const history = useHistory()

  useEffect(() => {
    watchList('roles')
  })

  const list = getList('roles').map(({ key, val }) => {
    return { key, ...val }
  })

  const Row = ({ data, index, style }) => {
    const { name = '', description = '', key } = data

    return (
      <div key={key} style={style}>
        <ListItem
          button
          alignItems="flex-start"
          style={{ height: 72 }}
          onClick={() => {
            history.push(`/roles/${key}`)
          }}
        >
          <ListItemAvatar>
            <Avatar>
              <AccountBoxIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={`${name}`} secondary={description} />
        </ListItem>
        <Divider variant="inset" />
      </div>
    )
  }

  return (
    <ListPage
      name="roles"
      list={list}
      fields={fields}
      Row={Row}
      listProps={{ itemSize: 72 }}
      getPageProps={(list) => {
        return {
          pageTitle: intl.formatMessage(
            {
              id: 'roles',
              defaultMessage: 'Roles',
            },
            { count: list.length }
          ),
        }
      }}
    />
  )
}
